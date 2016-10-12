/*
 * SonarQube
 * Copyright (C) 2009-2016 SonarSource SA
 * mailto:contact AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
package org.sonar.server.project.es;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.sonar.core.util.stream.Collectors;
import org.sonar.server.es.BaseIndex;
import org.sonar.server.es.EsClient;

import static java.util.Arrays.stream;
import static org.sonar.server.project.es.ProjectIndexDefinition.INDEX_PROJECTS;
import static org.sonar.server.project.es.ProjectIndexDefinition.TYPE_PROJECT;

public class ProjectIndex extends BaseIndex {

  public ProjectIndex(EsClient client) {
    super(client);
  }

  public Optional<String> getUuidByKey(String key) throws ExecutionException, InterruptedException {
    QueryBuilder condition = QueryBuilders.boolQuery()
      .must(QueryBuilders.termQuery(ProjectIndexDefinition.FIELD_KEY, key));

    SearchRequestBuilder request = getClient()
      .prepareSearch(INDEX_PROJECTS)
      .setTypes(TYPE_PROJECT)
      .setFetchSource(false)
      .setQuery(condition);

    SearchResponse response = request.get();
    if (response.getHits().totalHits() > 0) {
      return Optional.ofNullable(response.getHits().getHits()[0].getId());
    }
    return Optional.empty();
  }

  public List<String> searchByName(String name) throws ExecutionException, InterruptedException {
    QueryBuilder condition = QueryBuilders.matchQuery(ProjectIndexDefinition.FIELD_NAME + "." + SEARCH_PARTIAL_SUFFIX, name);

    SearchRequestBuilder request = getClient()
      .prepareSearch(INDEX_PROJECTS)
      .setTypes(TYPE_PROJECT)
      .setFetchSource(false)
      .setQuery(condition);

    System.out.println(request);
    SearchResponse response = request.get();
    return stream(response.getHits().getHits()).map(SearchHit::getId).collect(Collectors.toList());
  }
}

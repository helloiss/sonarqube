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

import org.sonar.api.config.Settings;
import org.sonar.server.es.IndexDefinition;
import org.sonar.server.es.NewIndex;

public class ProjectIndexDefinition implements IndexDefinition {

  public static final String INDEX_PROJECTS = "projects";
  public static final String TYPE_PROJECT = "project";
  public static final String FIELD_KEY = "key";
  public static final String FIELD_NAME = "name";
  public static final String FIELD_ANALYSED_AT = "analysedAt";

  private final Settings settings;

  public ProjectIndexDefinition(Settings settings) {
    this.settings = settings;
  }

  @Override
  public void define(IndexDefinitionContext context) {
    NewIndex index = context.create(INDEX_PROJECTS);

    index.refreshHandledByIndexer();
    index.configureShards(settings, 5);

    NewIndex.NewIndexType mapping = index.createType(TYPE_PROJECT);
    mapping.stringFieldBuilder(FIELD_KEY).disableNorms().build();
    mapping.stringFieldBuilder(FIELD_NAME).enableSorting().enableGramSearch().build();
    mapping.createDateTimeField(FIELD_ANALYSED_AT);
    mapping.setEnableSource(false);
  }
}

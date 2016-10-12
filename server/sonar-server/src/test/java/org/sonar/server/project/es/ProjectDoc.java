package org.sonar.server.project.es;

import java.util.Date;
import java.util.HashMap;
import javax.annotation.CheckForNull;
import javax.annotation.Nullable;
import org.sonar.server.es.BaseDoc;

public class ProjectDoc extends BaseDoc {

  public ProjectDoc() {
    super(new HashMap<>(4));
  }

  @Override
  public String getId() {
    return getField("_id");
  }

  @Override
  public String getRouting() {
    return null;
  }

  @Override
  public String getParent() {
    return null;
  }

  public ProjectDoc setId(String s) {
    setField("_id", s);
    return this;
  }

  public String getKey() {
    return getField(ProjectIndexDefinition.FIELD_KEY);
  }

  public ProjectDoc setKey(String s) {
    setField(ProjectIndexDefinition.FIELD_KEY, s);
    return this;
  }

  public String getName() {
    return getField(ProjectIndexDefinition.FIELD_NAME);
  }

  public ProjectDoc setName(String s) {
    setField(ProjectIndexDefinition.FIELD_NAME, s);
    return this;
  }

  @CheckForNull
  public Date getAnalysedAt() {
    return getFieldAsDate(ProjectIndexDefinition.FIELD_ANALYSED_AT);
  }

  public ProjectDoc setAnalysedAt(@Nullable Date d) {
    setField(ProjectIndexDefinition.FIELD_ANALYSED_AT, d);
    return this;
  }
}

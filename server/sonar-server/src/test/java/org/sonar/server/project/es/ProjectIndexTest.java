package org.sonar.server.project.es;

import org.junit.Rule;
import org.junit.Test;
import org.sonar.api.config.MapSettings;
import org.sonar.server.es.EsTester;

import static org.assertj.core.api.Assertions.assertThat;


public class ProjectIndexTest {

  @Rule
  public EsTester es = new EsTester(new ProjectIndexDefinition(new MapSettings()));

  private ProjectIndex underTest = new ProjectIndex(es.client());

  @Test
  public void getUuidByKey() throws Exception {
    ProjectDoc project1 = new ProjectDoc().setId("P1").setKey("angularjs").setName("Angular JS");
    ProjectDoc project2 = new ProjectDoc().setId("P2").setKey("struts").setName("Apache Struts");
    es.putDocuments("projects", "project", project1, project2);

    assertThat(underTest.getUuidByKey("struts").get()).isEqualTo("P2");
  }

  @Test
  public void searchByName() throws Exception {
    ProjectDoc project1 = new ProjectDoc().setId("P1").setKey("angularjs").setName("Angular JS");
    ProjectDoc project2 = new ProjectDoc().setId("P2").setKey("struts").setName("Apache Struts");
    ProjectDoc project3 = new ProjectDoc().setId("P3").setKey("reactjs").setName("React js");
    es.putDocuments("projects", "project", project1, project2, project3);

    assertThat(underTest.searchByName("apache")).containsOnly("P2");
    assertThat(underTest.searchByName("Apache")).containsOnly("P2");
    assertThat(underTest.searchByName("teryk")).isEmpty();
    assertThat(underTest.searchByName("js")).containsOnly("P1", "P3");
    assertThat(underTest.searchByName("JS")).containsOnly("P1", "P3");
    assertThat(underTest.searchByName("angu")).containsOnly("P1");
  }
}

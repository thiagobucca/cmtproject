package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.Language;
import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(JobHistory.class)
public abstract class JobHistory_ {

	public static volatile SingularAttribute<JobHistory, Instant> endDate;
	public static volatile SingularAttribute<JobHistory, Language> language;
	public static volatile SingularAttribute<JobHistory, Long> id;
	public static volatile SingularAttribute<JobHistory, Job> job;
	public static volatile SingularAttribute<JobHistory, Department> department;
	public static volatile SingularAttribute<JobHistory, Employee> employee;
	public static volatile SingularAttribute<JobHistory, Instant> startDate;

}


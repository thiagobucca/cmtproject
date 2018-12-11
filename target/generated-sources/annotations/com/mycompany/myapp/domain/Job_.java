package com.mycompany.myapp.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Job.class)
public abstract class Job_ {

	public static volatile SingularAttribute<Job, Long> maxSalary;
	public static volatile SingularAttribute<Job, String> jobTitle;
	public static volatile SingularAttribute<Job, Long> id;
	public static volatile SingularAttribute<Job, Long> minSalary;
	public static volatile SingularAttribute<Job, Employee> employee;
	public static volatile SetAttribute<Job, Task> tasks;

}


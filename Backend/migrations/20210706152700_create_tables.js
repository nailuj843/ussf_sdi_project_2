
exports.up = function(knex, Promise) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary(); // adds an auto incrementing PK column
        table.string('customer').notNullable();
      }).then(() => {
            return knex.schema.createTable('users', table => {
                table.increments('id').primary(); // adds an auto incrementing PK column
                table.string('name').notNullable();
                table.string('email').notNullable();
                table.string('password').notNullable();
                table.boolean('commander').notNullable();
        })
        }).then(() => {
            return knex.schema.createTable('launchschedule', table => {
                table.increments('id').primary(); // adds an auto incrementing PK column
                table.integer('customer_id').notNullable().references('id').inTable('customers').onDelete('CASCADE');
                table.string('vehicle').notNullable();
                table.string('payload').notNullable();
                table.string('launch_date').notNullable();
                table.string('launch_time').notNullable();
                table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
                table.string('request_date').defaultTo(new Date().toGMTString());
                table.boolean('commander_approval').defaultTo('false');
                table.string('scrub_reason').defaultTo('N/A');
            })
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customers')
    .dropTableIfExists('users')
    .dropTableIfExists('launchschedule')
};

// module.exports.up = function(knex, Promise) {
//     // Create referenced table before referencing table.
//     return knex.schema
//     .createTable('first', function(first) {
//       first.increments('id').primary();
//     })
//     .createTable('second', function(second) {
//       second.increments('id').primary();
//       second.integer('first_id').references('id').inTable('first').notNull().onDelete('cascade');
//     });
//   };
  
//   module.exports.down = function(knex, Promise) {
//     // Reverse order here to prevent error.
//     return knex.schema
//     .dropTable('second')
//     .dropTable('first');
//   }
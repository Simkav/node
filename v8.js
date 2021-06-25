const v8 = require('v8')
/* 
v8.cachedDataVersionTag() -- representing a version tag derived from the V8 version, command-line flags, and detected CPU features. 
====================================================================================================================================
v8.getHeapCodeStatistics() -- 
code_and_metadata_size 
bytecode_and_metadata_size 
external_script_source_size 
====================================================================================================================================
v8.getHeapSnapshot() -- поток содержащий снапшот кучи в8, недокмуентированый и на разных версиях в8 разный выход
Снапшот - Что-то типа комита во вселенной гита
====================================================================================================================================
v8.getHeapSpaceStatistics() -- стастика о разной памяти в8, разных версиях в8 разный выход 
Возвращает массив с обж, с такими свойствами
space_name 
space_size 
space_used_size 
space_available_size
physical_space_size 

Подсказка по space_name
new_space: Most objects are allocated here. 
New-space is small and is designed to be garbage collected very quickly,
independent of other spaces.

old_pointer_space: Contains most objects which may have pointers to other objects.
Most objects are moved here after surviving in new-space for a while.

old_data_space: Contains objects which just contain raw data (no pointers to other objects).
Strings, boxed numbers, and arrays of unboxed doubles are moved here after surviving in new-space for a while.

large_object_space: This space contains objects which are larger than the size limits of other spaces.
Each object gets its own mmap'd region of memory. 
Large objects are never moved by the garbage collector.

Code_space: Code objects, which contain JITed instructions, are allocated here.
This is the only space with executable memory (although Codes may be allocated in large-object-space, and those are executable, too).

Cell_space, property-cell-space and map-space: These spaces contain Cells, PropertyCells, and Maps, respectively.
Each of these spaces contains objects which are all the same size and has some constraints on what kind of objects they point to, which simplifies collection.

====================================================================================================================================
v8.getHeapStatistics() -- 
total_heap_size : Number of bytes V8 has allocated for the heap. This can grow if usedHeap needs more.
total_heap_size_executable : Number of bytes for compiled bytecode and JITed code
total_physical_size : Committed size
total_available_size : Available heap size
used_heap_size : Number of bytes in used by application data
heap_size_limit : The absolute limit the heap cannot exceed (default limit or --max_old_space_size)
malloced_memory : current amount of memory, obtained via malloc
peak_malloced_memory : peak amount of memory, obtained via malloc

does_zap_garbage : is a 0/1 boolean, 
which signifies whether the --zap_code_space option is enabled or not. 
This makes V8 overwrite heap garbage with a bit pattern.
The RSS footprint (resident memory set) gets bigger 
because it continuously touches all heap pages and that makes them less likely to get swapped out by the operating system.

number_of_native_contexts : The value of native_context is the number of the top-level contexts currently active. 
!!!Increase of this number over time indicates a memory leak.
number_of_detached_contexts: The value of detached_context is the number of contexts that were detached and not yet garbage collected. 
!!!This number being non-zero indicates a potential memory leak. 
====================================================================================================================================
v8.setFlagsFromString(flags)

Позволяет установить флаги для в8 прямо в коде
Дважды подумать перед использованием, так как может все сломать
Посмотреть доступны флаги можно выполнив node --v8-options
====================================================================================================================================

// v8.writeHeapSnapshot([filename]) // string

Записывает снапшот кучи v8 в [filename] 
v8.serialize()
v8.deserialize()
Сериализация и десериализация
Пока нашел применение только для копирования 
Не может копировать функции кинет ошибку
*/

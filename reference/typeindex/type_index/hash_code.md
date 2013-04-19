#hash_code
```cpp
size_t hash_code() const;
```

##概要

<b>型のハッシュ値を返す。</b>


##戻り値

`target->hash_code()`※targetは、type_indexのメンバ変数として保持されているtype_infoへのポインタ(説明用)


##例

```cpp
#include <iostream>
#include <typeindex>
#include <unordered_map>

int main()
{
  {
    std::type_index t1 = typeid(int);
    std::type_index t2 = typeid(double);
    std::type_index t3 = typeid(char);

    std::cout << t1.hash_code() << std::endl;
    std::cout << t2.hash_code() << std::endl;
    std::cout << t3.hash_code() << std::endl;
  }
  std::cout << std::endl;
  {
    // ハッシュ表であるunordered_mapでtype_indexをキーにできる
    std::unordered_map<std::type_index, int> m = {
        { typeid(int),    3},
        { typeid(double), 1},
        { typeid(char),   4}
    };

    std::cout << m.at(typeid(int))    << std::endl;
    std::cout << m.at(typeid(double)) << std::endl;
    std::cout << m.at(typeid(char))   << std::endl;
  }
}
```
* t1.hash_code()[color ff0000]
* t2.hash_code()[color ff0000]
* t3.hash_code()[color ff0000]
* std::unordered_map<std::type_index, int>[color ff0000]

###出力例

```cpp
3616029859
3161387801
3235490055

3
1
4
```

##バージョン


###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1<h4></h4>


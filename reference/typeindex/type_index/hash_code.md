#hash_code (C++11)
```cpp
size_t hash_code() const;
```

##概要
型のハッシュ値を返す。


##戻り値
`target->hash_code()`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


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
* hash_code[color ff0000]

###出力例
```
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
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1


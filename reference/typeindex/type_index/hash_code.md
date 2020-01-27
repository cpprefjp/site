# hash_code
* typeindex[meta header]
* std[meta namespace]
* type_index[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_t hash_code() const;          // C++11
size_t hash_code() const noexcept; // C++14
```

## 概要
型のハッシュ値を返す。


## 戻り値
`target->hash_code()`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


## 例
```cpp example
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
    // ハッシュ表であるunordered_mapでtype_indexを�ーにできる
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
* hash_code()[color ff0000]
* m.at[link /reference/unordered_map/unordered_map/at.md]

### 出力例
```
3616029859
3161387801
3235490055

3
1
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照
- [LWG Issue 2144. Missing `noexcept` specification in `type_index`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2144)


# operator=
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
flat_set& operator=(initializer_list<value_type> il);           // (1) C++23
constexpr flat_set& operator=(initializer_list<value_type> il); // (1) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]


## 概要
初期化子リストの値を代入する。


## 効果
`*this`の全ての要素が解放され、`il`の全ての要素が`*this`にコピー代入される。


## 戻り値
`*this`


## 備考
- 引数の型が `const flat_set&` であるコピー代入演算子と、引数の型が `flat_set&&` であるムーブ代入演算子は、それぞれ自動生成される。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  std::initializer_list<std::string> elems = {"Alice", "Bob", "Carol"};

  std::flat_set<std::string> fs;
  fs = elems;

  for (const std::string& i : fs) {
    std::cout << i << std::endl;
  }
}
```

### 出力
```
Alice
Bob
Carol
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)

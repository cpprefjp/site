# operator=
* flat_map[meta header]
* std[meta namespace]
* flat_multimap[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
flat_multimap& operator=(initializer_list<value_type> il); // C++23
```
* initializer_list[link /reference/initializer_list/initializer_list.md]


## 概要
初期化子リストの値を代入する。


## 効果
`*this`の全ての要素が解放され、`il`の全ての要素が`*this`にコピー代入される。


## 戻り値
`*this`


## 備考
- 引数の型が `const flat_multimap&` であるコピー代入演算子と、引数の型が `flat_multimap&&` であるムーブ代入演算子は、それぞれ自動生成される。


## 例
```cpp example
#include <flat_map>
#include <iostream>
#include <string>
#include <vector>

void print(const std::flat_multimap<std::string, int>& fm)
{
  std::cout << "{" << std::endl;
  for (const auto& kv: fm) {
    std::cout << "  " << kv.first << ": " << kv.second << "," << std::endl;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  std::initializer_list<std::pair<std::string, int>> elems = {{"Alice", 3}, {"Bob", 1}, {"Carol", 4}, {"Alice", 1}};

  std::flat_multimap<std::string, int> fm;
  fm = elems;

  print(fm);
}
```

### 出力
```
{
  Alice: 3,
  Alice: 1,
  Bob: 1,
  Carol: 4,
}
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

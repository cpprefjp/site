# contains
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool contains(const key_type& x) const;           // (1) C++20
constexpr bool contains(const key_type& x) const; // (1) C++26

template <class K>
bool contains(const K& x) const;           // (2) C++20
template <class K>
constexpr bool contains(const K& x) const; // (2) C++26
```


## 概要
指定されたキー`x`に一致する要素がコンテナに含まれているかを判定する。

- (1) : クラスのテンプレートパラメータ`key_type`型のキーを受け取る
- (2) : `key_type`と比較可能な`K`型のキーを受け取る


## 戻り値
以下と等価：

```cpp
return find(x) != end();
```
* find[link find.md]
* end()[link end.md]


## 計算量
対数時間


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::multimap<char, int> m = {
    {'a', 3},
    {'b', 1},
    {'c', 4}
  };

  // キー'b'の要素が含まれているか
  if (m.contains('b')) {
    std::cout << "contain" << std::endl;
  }
  else {
    std::cout << "doesn't contain" << std::endl;
  }
}
```
* contains[color ff0000]

### 出力
```
contain
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 1 [mark verified]

## 参照
- [P0458R2 Checking for Existence of an Element in Associative Containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0458r2.html)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)

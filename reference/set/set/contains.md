# contains
* set[meta header]
* std[meta namespace]
* set[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool contains(const key_type& x) const; // (1)

template <class K>
bool contains(const K& x) const;        // (2)
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
#include <set>

int main()
{
  std::set<int> s = {1, 2, 3};

  // キー2の要素が含まれているか
  if (s.contains(2)) {
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

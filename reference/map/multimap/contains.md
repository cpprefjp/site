# contains
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool contains(const key_type& x) const; // (1)

template <class K>
bool contains(const K& x) const;        // (2)
```


## 概要
指定された�ー`x`に一致する要素がコンテナに含まれているかを判定する。


## 戻り値
以下と�価：

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

  // �ー'b'の要素が含まれているか
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
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0458R2 Checking for Existence of an Element in Associative Containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0458r2.html)

# size
* flat_set[meta header]
* std[meta namespace]
* flat_set[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type size() const noexcept;           // (1) C++23
constexpr size_type size() const noexcept; // (1) C++26
```

## 概要
コンテナ内の要素の数を返す。


## 戻り値
`flat_set` クラスが内部で保持している `container_type` を `c` とすると、以下を返す。

```cpp
return c.size();
```
* size()[link /reference/vector/vector/size.md]


## 計算量
定数時間。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main ()
{
  std::flat_set<int> fs;

  std::cout << fs.size() << std::endl;

  fs.insert(1);
  fs.insert(2);
  fs.insert(3);
  fs.insert(1);

  std::cout << fs.size() << std::endl;
}
```
* size()[color ff0000]
* fs.insert[link insert.md]

### 出力
```
0
3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`empty()`](empty.md)


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)

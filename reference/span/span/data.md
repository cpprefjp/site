# data
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr pointer data() const noexcept;
```

## 概要
参照範囲の先�を指すポインタを取得する。


## 戻り値
メンバ変数として保持している、参照範囲の先�を指すポインタを返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <cassert>
#include <span>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  int* p1 = std::span{v}.data();
  assert(p1 == &v[0]);

  int* p2 = std::span{v}.subspan(2, 3).data();
  assert(p2 == &v[2]);
}
```
* data()[color ff0000]
* subspan[link subspan.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

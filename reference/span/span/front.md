# front
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr reference front() const;
```

## 概要
参照範囲の先�要素を取得する。


## 事前条件
- [`empty()`](empty.md)が`false`であること


## 戻り値
以下と�価：

```cpp
return *data();
```
* data()[link data.md]


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

  int& x = std::span{v}.front();
  assert(x == 1);

  int& y = std::span{v}.subspan(2, 3).front();
  assert(y == 3);
}
```
* front()[color ff0000]
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

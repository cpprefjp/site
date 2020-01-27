# operator=
* future[meta header]
* std[meta namespace]
* future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
future& operator=(const future& rhs) = delete; // (1)
future& operator=(future&& rhs) noexcept;      // (2)
```

## 概要
- (1) : コピー代入。コピー不可。
- (2) : ムーブ代入。


## 効果
- (2) : 共有状態を解放し、`rhs`の共有状態を含むコンテンツを`*this`にムーブ代入する。


## 戻り値
- (2) : `*this`


## 事後条件
- (2) : [`valid()`](valid.md)の戻り値が、この関数を呼び出す前の`rhs.`[`valid()`](valid.md)と�価になること。`rhs.`[`valid()`](valid.md) `== false`になること。


## 例外
- (2) : 投げない


## 例
```cpp example
#include <future>

int main()
{
  std::promise<int> p;
  std::future<int> f;
  f = p.get_future();
}
```
* std::promise[link /reference/future/promise.md]
* p.get_future()[link /reference/future/promise/get_future.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 参照



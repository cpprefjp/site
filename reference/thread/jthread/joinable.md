# joinable
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool joinable() const noexcept;
```

## 概要
`jthread`オブジェクトがスレッドと関連付けられているか否か取得する。


## 戻り値
```cpp
return get_id() != id();
```
* get_id()[link get_id.md]
* id[link /reference/thread/thread/id.md]


## 例外
送出しない。


## 例
```cpp example
#include <cassert>
#include <thread>

int main()
{
  std::jthread t([]{ /*...*/ });
  assert(t.joinable());

  t.join();
  assert(!t.joinable());
}
```
* joinable()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

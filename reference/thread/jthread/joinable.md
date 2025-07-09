# joinable
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] bool joinable() const noexcept; // (1) C++20
bool joinable() const noexcept;               // (1) C++26
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
  std::jthread jt([]{ /*...*/ });
  assert(jt.joinable());

  jt.join();
  assert(!jt.joinable());
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


## 参照
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された

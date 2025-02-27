# hardware_concurrency
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]]
static unsigned int hardware_concurrency() noexcept; // (1) C++20
static unsigned int hardware_concurrency() noexcept; // (1) C++26
```

## 概要
処理系によりサポートされるスレッド並行数を取得する。


## 戻り値
```cpp
return thread::hardware_concurrency();
```
* thread[link /reference/thread/thread.md]
* hardware_concurrency()[link /reference/thread/thread/hardware_concurrency.md]

## 例外
送出しない。


## 例
```cpp example
#include <iostream>
#include <thread>

int main()
{
  std::cout << "concurrency=" << std::jthread::hardware_concurrency() << std::endl;
  return 0;
}
```
* hardware_concurrency()[color ff0000]

### 出力例
```
concurrency=12
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

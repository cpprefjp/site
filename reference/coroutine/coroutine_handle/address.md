# address
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr void* address() const noexcept;
```

## 概要
コルーチンハンドルに対応するアドレス値を返す。


## 戻り値
コルーチンハンドルに対応するアドレス値。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <coroutine>

int main()
{
  std::coroutine_handle<> h;
  assert(h.address() == nullptr);
}
```
* address()[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
- [`from_address`](from_address.md)

# コンストラクタ
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr coroutine_handle() noexcept;           // (1)
constexpr coroutine_handle(nullptr_t) noexcept;  // (2)
```

## 概要
有効なコルーチンを指さないコルーチンハンドルを構築する。

実際のコルーチンを指す`coroutine_handle`は、静的メンバ関数[`from_promise`](from_promise.md)／[`from_address`](from_address.md)を利用する。


## 事後条件
[`address()`](address.md) `== nullptr`


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
* std::coroutine_handle[color ff0000]
* address()[link address.md]

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
- [`from_promise`](from_promise.md)
- [`from_address`](from_address.md)

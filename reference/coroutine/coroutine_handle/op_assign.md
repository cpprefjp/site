# 代入演算子
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
coroutine_handle& operator=(nullptr_t) noexcept;
```

## 概要
コルーチンハンドルをリセットし、有効なコルーチンを指さない状態にする。


## 戻り値
`*this`


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
  h = nullptr;
  assert(h.address() == nullptr);
}
```
* = nullptr[color ff0000]
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

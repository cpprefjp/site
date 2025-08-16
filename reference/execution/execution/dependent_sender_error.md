# dependent_sender_error
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct dependent_sender_error : exception {};
}
```
* exception[link /reference/exception/exception.md]

## 概要
`dependent_sender_error`は、[依存Sender](dependent_sender.md)に対する[完了シグネチャ集合取得](get_completion_signatures.md)時に送出される例外クラスである。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::dependent_sender`](dependent_sender.md)
- [`execution::get_completion_signatures`](get_completion_signatures.md)

## 参照
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)

# formatter
* thread[meta header]
* std[meta namespace]
* thread::id[meta class]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class charT>
  class formatter<thread::id, charT>;
}
```

## 概要
`thread::id`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

```
[[fill] [align] [width]]
```


## 例
```cpp example
#include <print>
#include <thread>

int main()
{
  std::println("{}", std::this_thread::get_id());
  std::println("{: >30}", std::this_thread::get_id());
}
```
* std::this_thread[link /reference/thread/this_thread.md]
* get_id()[link /reference/thread/this_thread/get_id.md]

### 出力
```
140474254677824
               140474254677824
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 14
- [Visual C++](/implementation.md#visual_cpp): ??


### 備考
- GCCは14.1段階では、[`<sstream>`](/reference/sstream.md)を追加でインクルードしなければコンパイルエラーとなる
    - [Bug 115099 - compilation error: format `thread::id`](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=115099)


## 関連項目
- [`std::format()`](/reference/format/format.md) (フォーマットの詳細)


## 参照
- [P2693R1 Formatting `thread::id` and `stacktrace`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2693r1.pdf)

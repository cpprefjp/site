# nullptr_t型の定数式を非型テンプレートパラメータとすることを許可
* cpp14[meta cpp]

<!-- start lang caution -->

このページはC++14に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
[`nullptr_t`](/reference/cstddef/nullptr_t.md)型の定数式を非型テンプレートパラメータとすることが許可された。


## 例
```cpp example
#include <cstddef>

template <std::nullptr_t P>
struct X {};

int main()
{
  X<nullptr>();
}
```

### 出力
```
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `nullptr`](/lang/cpp11/nullptr.md)


## 参照
- [CWG Issue 1398. Non-type template parameters of type `std::nullptr_t`](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1398)
# 例外を送出しうる例外指定をもつ解放関数を不適格とする [P3424R2]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
[`operator delete`](/reference/new/op_delete.md)などの解放関数（deallocation function）は、明示的な`noexcept`指定を書かなければ、例外を送出しない例外指定を持つと規定されている。一方で、`noexcept(false)`のような例外を送出しうる例外指定を明示的に付けることは可能であり、その場合に解放関数から例外が送出されると未定義動作だった。

C++29では、解放関数が例外を送出しうる例外指定を持つこと自体が不適格となる。

```cpp
struct T {
  void operator delete(void*) noexcept(false); // C++29からコンパイルエラー
                                               // （C++26までは適格だが、例外を送出すると未定義動作）
};
```

例外を送出しうる例外指定を解放関数に付けても、例外の送出が未定義動作を引き起こすようになるだけで、有用な用途がなかった。宣言の時点で不適格とすることで、この未定義動作へ到達する経路そのものがなくなる。


## 仕様
- 解放関数は、例外を送出しうる例外指定を持ってはならない。持つ場合、プログラムは不適格となる
- 「解放関数が例外の送出によって終了した場合、動作は未定義」という規定は、到達不能となるため削除される
    - 解放関数の本体からの例外送出は、例外を送出しない例外指定によって[`std::terminate()`](/reference/exception/terminate.md)の呼び出しとなる


## 例
```cpp example
#include <cstdlib>
#include <new>

struct T {
  // 明示的なnoexcept指定のない解放関数は、例外を送出しない例外指定を持つ
  static void operator delete(void* p) {
    std::free(p);
  }

  // C++29からコンパイルエラー：解放関数は例外を送出しうる例外指定を持てない
  // static void operator delete(void* p) noexcept(false);

  static void* operator new(std::size_t size) {
    return std::malloc(size);
  }
};

int main()
{
  T* p = new T;
  delete p;
}
```
* std::malloc[link /reference/cstdlib/malloc.md]
* std::free[link /reference/cstdlib/free.md]

### 出力
```
```


## この機能が必要になった背景・経緯
解放関数からの例外送出を未定義動作とする規定は、動的例外指定が使われていた時代からあり、既定の例外指定が例外を送出しないものになった後は、明示的に例外を送出しうる例外指定を付けた場合にのみ到達しうる規定として残っていた。この規定に対しては、例外指定と矛盾しているという指摘が2014年にCWG 2042として挙げられており、本提案は未定義動作に到達する可能性を宣言の時点で排除することでこのIssueを解決した。

なお、当初の提案には解放関数の例外指定の非推奨化も含まれていたが、例外指定自体を将来削除する動機はないという理由で見送られた。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`operator delete`](/reference/new/op_delete.md)
- [`operator delete[]`](/reference/new/op_delete[].md)
- [C++11 `noexcept`](/lang/cpp11/noexcept.md)


## 参照
- [P3424R2 Deallocation Functions with Throwing Exception Specification Are Ill-formed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3424r2.pdf)
- [CWG Issue 2042. Exceptions and deallocation functions](https://cplusplus.github.io/CWG/issues/2042.html)
    - 解放関数からの例外送出を未定義動作とする規定が例外指定と矛盾しているという指摘。本提案によって解決された

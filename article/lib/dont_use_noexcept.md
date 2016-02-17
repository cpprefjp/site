#標準ライブラリにおける、関数にnoexceptを付けない条件

C++11から、`throw`キーワードを使用した関数の例外指示が非推奨になり、例外を投げないことを明示する`noexcept`キーワードが追加された。

標準ライブラリも`noexcept`に対応しているが、仕様上、自然言語で「Throws: Nothing.(例外を投げない)」と書いてあって、`noexcept`が付いていないものがいくつか存在する。


たとえば、[`std::mutex`](/reference/mutex/mutex.md)クラスの[`unlock()`](/reference/mutex/mutex/unlock.md)メンバ関数には、`noexcept`が付いていない。

これについては、「[N3279 - Conservative use of noexcept in the library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3279.pdf)」のペーパーで論じられている。簡単に言えば、`noexcept`を付けない条件は以下のようになる：


関数に事前条件が設定されている場合(`unlock()`の場合は、すでにアンロックされていないこと)、事前条件の不一致を報告するために、実装が例外を投げる場合がある。そういう関数に対しては、`noexcept`は付いていない。


例外があることを前提としていない、C言語の互換ライブラリには、`noexcept`が付いている場合がある。たとえば、[`atomic_exchange()`](/reference/atomic/atomic_exchange.md)のような、[アトミックライブラリ](/reference/atomic.md)の関数などには、`noexcept`が付いている。


##関連項目
- [C++11 noexcept](/lang/cpp11/noexcept.md)


##参照元
この記事は、「[標準ライブラリにおける、関数にnoexceptを付けない条件 - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20130620/1371715296)」のブログエントリから転載し、修正を行っている。


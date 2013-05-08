#bind


```cpp
<pre style='margin-top:0px;margin-bottom:0px'>namespace std {
  template <class F, class... BoundArgs>
  unspecified bind(F&& f, BoundArgs&&... bound_args);

  template <class R, class F, class ...BoundArgs>
  unspecified bind(F&& f, BoundArgs&&... bound_args);
}</pre>
```
* unspecified[italic]

###概要
<p style='color:rgb(65,75,86);font-family:Arial,Verdana,sans-serif;line-height:normal;font-size:13px;font-weight:normal'>[<i>Callable</i>](/reference/functional/callable.md) オブジェクトに対し、引数を部分的に束縛(bind)する。</p>

###引数

- `f` -- 束縛先となる [<i>Callable</i>](/reference/functional/callable.md) オブジェクト
- `bound_args` -- 束縛対象の値やプレースホルダ(_1, _2, ...)、別の bind 呼び出し

###<span style='background-color:rgb(255,255,255)'>戻り値</span>

<p style='font-family:Arial,Verdana,sans-serif;color:rgb(65,75,86);line-height:normal'><span style='background-color:rgb(255,255,255)'>引数を部分束縛された<i> [Callable](/reference/functional/callable.md)</i> オブジェクト。</span></p><p style='font-family:Arial,Verdana,sans-serif;color:rgb(65,75,86);line-height:normal'>このオブジェクトは、次のような関数オブジェクトとして扱うことができる：</p>```cpp
<pre style='line-height:13px;margin-top:0px;margin-bottom:0px'>struct bound_function_type {</pre><pre style='line-height:13px;margin-top:0px;margin-bottom:0px'>  typedef unspecified result_type;</pre><pre style='line-height:13px;margin-top:0px;margin-bottom:0px'>  template <class... UnBoundArgs>
  unspecified operator ()(UnBoundArgs &&... unbound_args) const;</pre>};
```
* bound_function_type [italic]
* unspecified[italic]

###<p style='font-family:Arial,Verdana,sans-serif;line-height:normal;font-size:13px;font-weight:normal'>型名 `result_type` は、`bind()` 呼び出し時のテンプレートパラメータ `R` そのもの(明示的に指定した場合)か、`F` の戻り値型(`F` が関数へのポインタまたはメンバ関数へのポインタである場合)か、`F::result_type` (`F` が型名 `result_type` の定義を持つ場合)である。いずれの条件も満たさない場合、`result_type` は定義されない。</p><p style='font-family:Arial,Verdana,sans-serif;line-height:normal;font-size:13px;font-weight:normal'>`<i>bound_function_type</i>::operator ()()`を呼び出すと、`bound_args` と `unbound_args` が次のように使われ、最終的に `f` の呼出しに到達する。(説明用に、 `BoundArgs` のそれぞれの `decay` された型を `TiD` 、値を `ti` 、`UnBoundArgs` のそれぞれの値を `uj` とおく)。</p><ol>
- 型<code style='font-weight:normal'>Ti</code> が `std::[reference_wrapper](/reference/functional/reference_wrapper.md)<X>` である場合、<code style='font-weight:normal'>ti.[get()](/reference/functional/reference_wrapper/get.md)</code> が <code style='font-weight:normal'>ti</code> の代わりに使用される。
- `std::[is_bind_expression](/reference/functional/is_bind_expression.md)<TiD>::value`が <code style='font-weight:normal'>true</code> に評価される場合、<code style='font-weight:normal'>ti(unbound_args...)</code> の結果が <code style='font-weight:normal'>ti</code> の代わりに使用される(これは、ネストされた <code style='font-weight:normal'>bind()</code> が一度の呼び出しで再帰的に全て評価されることを示す)。
- `std::[is_placeholder](/reference/functional/is_placeholder.md)<TiD>::value`が非ゼロに評価される場合、<code style='font-weight:normal'>uj</code> (ただし `j = std::[is_placeholder](/reference/functional/is_placeholder.md)<Ti>::value+1`) が <code style='font-size:small;font-weight:normal'>ti</code> の代わりに使用される。
- その他の場合、`ti` がそのまま使用される。</ol><p style='font-family:Arial,Verdana,sans-serif;line-height:normal;font-size:13px;font-weight:normal'>上記の置換を行った後、 `f(ti...)` を呼び出した結果が `<i>bound_function_type</i>::operator ()()` の呼出し結果として返される。</p><p style='font-family:Arial,Verdana,sans-serif;line-height:normal;font-size:13px;font-weight:normal'>注意： `bound_args` は明示的に [`std::ref()`](/reference/functional/reference_wrapper/ref.md) または [`std::cref()`](/reference/functional/reference_wrapper/cref.md) で包まない限り、内部でコピーして保持される。他方、`unbound_args` は通常の [perfect forwarding](/reference/utility/forward.md) が行われるため、`move` で渡したあるいは一時オブジェクトを直接渡した `unbound_args` を複数回プレースホルダ経由で使用すると予期しない結果になることがある。</p>


##例
```cpp
#include <iostream>
#include <functional>

int add(int a, int b, int c)
{
    return a + b + c;
}

int main()
{
    // 第1引数のみを先に渡す
    using namespace std::placeholders;
    std::function<int(int, int)> f = std::bind(add, 2, _1, _2);

    // 残りの引数を渡して関数を呼び出す
    const int result = f(3, 4);

    std::cout << result << std::endl;
}
```
* bind[color ff0000]

###出力
9



##バージョン

###言語

- C++11


###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照




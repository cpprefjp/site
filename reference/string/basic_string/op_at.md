#operator[]
```cpp
const_reference operator[](size_type pos) const noexcept;
reference operator[](size_type pos) noexcept;
```

##概要

<b>pos 文字目の文字への参照を返す。</b>


##要件

`pos <= [size()](/reference/string/basic_string/size.md)`

##効果



##事後条件



##戻り値

`pos < [size()](/reference/string/basic_string/size.md)` の場合、`*([begin()](/reference/string/basic_string/begin.md) + pos)` を返す。

そうでない場合は、`charT()` の値を持ったオブジェクトへの参照を返す。
後者の場合、参照を変更するべきではない。


##例外



##計算量

定数時間。


##備考



##例

```cpp
```

###出力

```cpp
##バージョン
```

###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```
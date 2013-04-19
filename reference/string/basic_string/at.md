#at
```cpp
const_reference at(size_type pos) const;
reference at(size_type pos);
```

##概要

<b>pos 文字目の文字への参照を返す。</b>


##要件

`pos < [size()](/reference/string/basic_string/size.md)`

##効果



##事後条件



##戻り値

[`operator[]`](/reference/string/basic_string/op_at.md)(pos) の結果。


##例外

`pos >= [size()](/reference/string/basic_string/size.md)` の時、[`out_of_range`](/reference/stdexcept.md) 例外を投げる。


##計算量



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
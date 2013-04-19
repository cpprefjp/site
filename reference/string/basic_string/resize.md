#resize
```cpp
void resize(size_type n, charT c);
void resize(size_type n);
```

##概要

<b>文字列の長さを変更する。</b>


##要件

`n <= [max_size()](/reference/string/basic_string/max_size.md)`

##効果

`n <= [size()](/reference/string/basic_string/size.md)` のとき、元の文字列の先頭 `n` 文字をコピーした文字列で置き換える。

`n > [size()](/reference/string/basic_string/size.md)` のとき、先頭 `n` 文字は元の文字列のコピー、残りは文字 `c` を並べた文字列で置き換える。

`resize(n)` は、 `resize(n, charT())` と等しい。


##事後条件



##戻り値

なし


##例外

`n > [max_size()](/reference/string/basic_string/max_size.md)` の時、[`length_error`](/reference/stdexcept.md) 例外を投げる。


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
#reserve
```cpp
void reserve(size_type res_arg=0);
```

##概要

<b>basic_string が最適にメモリを確保できるよう、</b>
<b>あらかじめサイズ変更の予定を指示する。</b>


##要件



##効果

`[capacity()](/reference/string/basic_string/capacity.md) >= res_arg` となる。


##事後条件



##戻り値

なし


##例外

`res_arg > [max_size()](/reference/string/basic_string/max_size.md)` の場合、[`length_error`](/reference/stdexcept.md) 例外を投げる。

`allocator_traits<Allocator>::allocate()` がよりふさわしい例外を投げるかもしれない。


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
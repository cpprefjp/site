#back
```cpp
const charT& back() const noexcept;
charT& back() noexcept;
```

##概要

<b>末尾文字への参照を返す。</b>


##要件

`![empty()](/reference/string/basic_string/empty.md)`

##効果



##事後条件



##戻り値

[`operator[]`](/reference/string/basic_string/op_at.md)([size()](/reference/string/basic_string/size.md) - 1) の結果。


##例外

例外不送出。


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
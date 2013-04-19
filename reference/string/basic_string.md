#basic_string

| |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<br/><br/><br/>```cpp
<br/>namespace std {<br/><br/>  template <class charT,<br/><br/>            class traits = char_traits<charT>,<br/><br/>            class Allocator = allocator<charT> ><br/><br/>  class basic_string;<br/><br/><br/><br/>  typedef basic_string<char>     string;<br/><br/>  typedef basic_string<char16_t> u16string;<br/><br/>  typedef basic_string<char32_t> u32string;<br/><br/>  typedef basic_string<wchar_t>  wstring;<br/><br/>}<br/><br/><br/><br/><br/><br/> |
```
* allocator[link /reference/memory/allocator.md]

##概要

C++の文字列のライブラリは、basic_stringクラスを定義の元に使っている。このbasic_stringはどんな種類の文字型で構成される文字列でも扱えるようになっているクラステンプレートである。stringとwstringがある。stringはchar型を文字型として、wstringはwchar_t型を文字型としている。


C++11よりu16string, u32stringが付加されている（？）。それぞれ、char16_t型とchar32_t型を要素に持つ。


stringは文字型の集合を扱えるようにした特別なコンテナである。


 単なる文字型のメモリ配列に過ぎない従来のC文字列とは異なり、C++の文字列はより直感的な操作ができ、かつ、C++で共通に使われる便利な特徴を多く組み込みで持っている「クラス」である。


stringはbasic_stringクラスを実体化したものである。それは<string>で

typedef basic_string<char> string;

と定義されている。


###メンバ関数

<b>構築</b>


| | |
|----------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [`(constructor)`](./basic_string/basic_string.md) | コンストラクタ |
| `(destructor)` | デストラクタ |
| [`operator=`](./basic_string/op_assign.md) | 代入演算子 |

<b>
</b>

<b>イテレータ</b>


| | |
|----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [`begin`](./basic_string/begin.md) | 先頭の要素を指すイテレータを取得する |
| [`end`](./basic_string/end.md) | 末尾の次を指すイテレータを取得する |
| [`cbegin`](./basic_string/begin.md) | 先頭の要素を指す読み取り専用イテレータを取得する(C++11) |
| [`cend`](./basic_string/end.md) | 末尾の次を指す読み取り専用イテレータを取得する(C++11) |
| [`rbegin`](./basic_string/rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend`](./basic_string/rend.md) | 先頭の前を指す逆イテレータを取得する |
| [`crbegin`](./basic_string/rbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する(C++11) |
| [`crend`](./basic_string/rend.md) | 先頭の前を指す読み取り専用逆イテレータを取得する(C++11) |

<b>領域</b>


| | |
|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| [`size`](./basic_string/size.md) | 文字列の長さを取得する |
| [`length`](./basic_string/size.md) | 文字列の長さを取得する |
| [`max_size`](./basic_string/max_size.md) | 格納可能な最大の文字列長を取得する |
| [`resize`](./basic_string/resize.md) | 文字列の長さを変更する |
| [`capacity`](./basic_string/capacity.md) | メモリを再確保せずに格納できる最大の要素数を取得する |
| [`reserve`](./basic_string/reserve.md) | `capacity`を変更する |
| `shrink_to_fit` | `capacity`を`size`まで縮小する(C++11) |
| [`clear`](./basic_string/clear.md) | 文字列をクリアする |
| [`empty`](./basic_string/empty.md) | 文字列が空かどうかを判定する |


<b>要素アクセス</b>


| | |
|------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| [`operator[]`](./basic_string/op_at.md) | 任意の位置の文字を取得する |
| [`at`](./basic_string/at.md) | 任意の位置の文字を取得する |
| [`front`](./basic_string/front.md) | 先頭の文字を取得する |
| [`back`](./basic_string/back.md) | 末尾の文字を取得する |


<b>文字列の変更</b>


| | |
|-------------------------|---------------------------------------------------------------------------------|
| `operator+=` | 文字／文字列を追加する |
| `append` | 文字／文字列を追加する |
| `push_back` | 文字を追加する |
| `assign` | 文字列の再代入 |
| `insert` | 文字／文字列を挿入する |
| `erase` | 文字を削除する |
| `replace` | 文字列の一部を置換する |
| `swap` | 他の`basic_string`オブジェクトとデータを入れ替える |


<b>文字列の操作</b>


| | |
|--------------------------------|-----------------------------------------------------------------------|
| `c_str` | C言語の文字列を取得する |
| `data` | C言語の文字列を取得する |
| `get_allocator` | アロケータを取得する |
| `copy` | 他の文字列にコピーする |
| `find` | 指定文字列を検索する |
| `rfind` | 最後に現れる指定文字列を検索する |
| `find_first_of` | 最初に現れる指定文字を検索する |
| `find_last_of` | 最後に現れる指定文字を検索する |
| `find_first_not_of` | 先頭から、指定文字が見つからない位置を検索する |
| `find_last_nof_of` | 末尾から、指定文字が見つからない位置を検索する |
| `substr` | 部分文字列を取得する |
| `compare` | 文字列比較 |




###メンバ定数


| | |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `npos` | 無効な位置を表す。`find`や`substr`などで使われる。 `static const size_type npos = -1;` |


###メンバ型


| | |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `traits_type` | 文字特性型 `traits` |
| `value_type` | 文字型 `traits::char_type` |
| `allocator_type` | アロケータ型 `Allocator` |
| `size_type` | 要素数を表す符号なし整数型。<br/> `allocator_traits<Allocator>::size_type` |
| `difference_type` | イテレータの差を表す符号付き整数型。 `allocator_traits<Allocator>::difference_type` |
| `reference` | 参照型 `value_type&` |
| `const_reference` | `const`参照型 `const value&` |
| `pointer` | ポインタ型 `allocator_traits<Allocator>::pointer` |
| `const_pointer` | `const`ポインタ型 `allocator_traits<Allocator>::const_pointer` |
| `iterator` | イテレータ |
| `const_iterator` | 読み取り専用イテレータ |
| `reverse_iterator` | 逆順イテレータ [reverse_iterator](/reference/iterator/reverse_iterator.md)<iterator> |
| `const_reverse_iterator` | 読み取り専用逆イテレータ [reverse_iterator](/reference/iterator/reverse_iterator.md)<const_iterator> |


###非メンバ関数


| | |
|-------------------------|----------------------------------------------------------------------|
| `operator+` | 文字列の連結 |
| `operator==` | 等値比較 |
| `operator!=` | 非等値比較 |
| `operator<` | 左辺が右辺より小さいかの判定を行う |
| `operator<=` | 左辺が右辺以下かの判定を行う |
| `operator>` | 左辺が右辺より大きいかの判定を行う |
| `operator>=` | 左辺が右辺以上かの判定を行う |
| `swap` | 2つの`basic_string`オブジェクトを入れ替える |
| `getline` | 入力ストリームから1行読み込む |




##例


```cpp
```

###出力

```cpp
###参照
```

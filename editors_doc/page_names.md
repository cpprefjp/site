# ページファイル名の付け方

cpprefjpサイトでは、ページファイル名の付け方について、いくつかの共通ルールがあります。


## 基本ルール
- 機能名をページファイル名とする
- マクロは小文字とする
- 大文字 + 区切り文字 + 拡張子で構成される名前のファイルは、MarkdownからHTMLへの変換の際に無視される
    - README.mdなど


## 演算子のファイル名
便宜的に、コンストラクタやデストラクタのような特殊メンバ関数も演算子という扱いにしている。

| 演算子 | 演算子名 | ファイル名 | 備考 |
|--------|----------|------------|------|
| コンストラクタ | | `op_constructor` | クラス名をファイル名にはしない |
| デストラクタ   | | `op_destructor`  | ファイル名に `~` (チルダ) が含まれないようにする |
| クラステンプレートの推論補助 | | `op_deduction_guide` | |
| `operator=`   | 代入演算子          | `op_assign` | |
| `operator[ ]` | 添字演算子          | `op_at`     | |
| `operator()`  | 関数呼び出し演算子  | `op_call`   | |
| `operator*` (単項) | 間接参照演算子 | `op_deref`  | dereferenceの略 |
| `operator->`  | ポインタアクセス演算子 | `op_arrow` | |
| `operator+=`  | 加算の複合代入 | `op_plus_assign`  | |
| `operator-=`  | 減算の複合代入 | `op_minus_assign` | |
| `operator*=`  | 乗算の複合代入 | `op_multiply_assign` | |
| `operator/=`  | 除算の複合代入 | `op_divide_assign` | |
| `operator%=`  | 剰余の複合代入 | `op_modulo_assign` | |
| `operator<<=` | 左ビットシフトの複合代入 | `op_left_shift_assign` | |
| `operator>>=` | 右ビットシフトの複合代入 | `op_right_shift_assign` | |
| `operator&=`  | ビット論理積の複合代入   | `op_and_assign` | |
| `operator`<code>&#x7C;</code>`=` | ビット論理和の複合代入 | `op_or_assign` | |
| `operator^=`  | ビット排他的論理和の複合代入 | `op_xor_assign` | |
| `operator++`  | インクリメント | `op_increment` | 前置・後置は同じページ内で解説する |
| `operator--`  | デクリメント | `op_decrement`   | 前置・後置は同じページ内で解説する |
| `operator+` (単項) | 単項プラス演算子              | `op_unary_plus` | |
| `operator-` (単項) | 単項マイナス演算子 (符号反転) | `op_unary_minus` | |
| `operator!`   | 論理反転演算子   | `op_not`           | |
| `operator~`   | ビット反転演算子 | `op_flip`          | |
| `operator==`  | 等値比較演算子   | `op_equal`         | |
| `operator!=`  | 非等値比較演算子 | `op_not_equal`     | |
| `operator<`   | 小なり演算子     | `op_less`          | |
| `operator>`   | 大なり演算子     | `op_greater`       | |
| `operator<=`  | 以下演算子       | `op_less_equal`    | |
| `operator>=`  | 以上演算子       | `op_greater_equal` | |
| `operator+` (二項) | 加算演算子  | `op_plus`          | |
| `operator-` (二項) | 減算演算子  | `op_minus`         | |
| `operator*` (二項) | 乗算演算子  | `op_multiply`      | |
| `operator/` (二項) | 除算演算子  | `op_divide`        | |
| `operator%` (二項) | 剰余演算子  | `op_modulo`        | |
| `operator&` | ビット論理積演算子 | `op_and` | |
| `operator`<code>&#x7C;</code> | ビット論理和演算子 | `op_or` | |
| `operator^` | ビット排他的論理和演算子 | `op_xor` | |
| `operator&&` | 論理積演算子 | `op_logical_and` | |
| `operator`<code>&#x7C;</code><code>&#x7C;</code> | 論理和演算子 | `op_logical_or` | |
| `operator<<` | ビット左シフト演算子 | `op_left_shift`  | |
| `operator>>` | ビット右シフト演算子 | `op_right_shift` | |
| `operator<<` | 出力ストリーム演算子 | `op_ostream`     | ビットシフトと意味論が異なるため、別ページとしている |
| `operator>>` | 入力ストリーム演算子 | `op_istream`     | ビットシフトと意味論が異なるため、別ページとしている |


C++にはこの表に含まれない演算子もいくつかあるが、ここでは標準ライブラリでオーバーロードされ、本サイトが掲載している演算子のみを記載している。

この表に含まれない演算子として、以下のようなものもある：

- 型変換演算子
    - `operator int`のような`int`への型変換演算子は、`op_int`のようなファイル名とする
    - 型の別名が使用される場合もあるが、`operator int_type`型変換演算子の場合は、`op_int_type`をファイル名とする
- リテラル演算子
    - `operator ""_i`のような`_i`サフィックスのリテラル演算子は、`op_i`のようなファイル名とする


## 同名のメンバ関数と非メンバ関数がある場合
非メンバ関数側のページファイル名末尾に`_free`を付ける。

`free`は「非メンバ関数 (non member function)」の通称である「フリー関数 (free function)」からきている。これを採用した理由は以下：

- `_non_member_function`は長いため、短くしたい
- `member`は男性器を意味するため、`function`は省略できない
- 規格用語にはないが、ページファイル名を短くするために便宜上`free`を採用する


## その他、例外的なページファイル名
- [`std::_Exit()`](https://cpprefjp.github.io/reference/cstdlib/exit_.html)は、ページファイル名を先頭アンダースコアしたところ、Chromeブラウザで404 Page Not Foundとなったため、回避策として末尾にアンダースコアを付けている

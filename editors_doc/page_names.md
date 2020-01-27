# ページファイル名の付け方

cpprefjpサイトでは、ページファイル名の付け方について、いくつかの共通ルールがあります。


## 基本ルール
- 機能名をページファイル名とする
- マク�は小文�とする
- 大文� + 区切り文� + 拡張�で構成される名前のファイルは、MarkdownからHTMLへの変換の際に無視される
    - README.mdなど


## 演算�のファイル名
便宜的に、コンストラクタやデストラクタのような特殊メンバ関数も演算�という扱いにしている。

| 演算� | 演算�名 | ファイル名 | 備考 |
|--------|----------|------------|------|
| コンストラクタ | | `op_constructor` | クラス名をファイル名にはしない |
| デストラクタ   | | `op_destructor`  | ファイル名に `~` (チルダ) が含まれないようにする |
| クラステンプレートの推論補助 | | `op_deduction_guide` | |
| `operator=`   | 代入演算�          | `op_assign` | |
| `operator[ ]` | 添�演算�          | `op_at`     | |
| `operator()`  | 関数呼び出し演算�  | `op_call`   | |
| `operator*` (単項) | 間接参照演算� | `op_deref`  | dereferenceの略 |
| `operator->`  | ポインタアクセス演算� | `op_arrow` | |
| `operator+=`  | 加算の複合代入 | `op_plus_assign`  | |
| `operator-=`  | 減算の複合代入 | `op_minus_assign` | |
| `operator*=`  | 乗算の複合代入 | `op_multiply_assign` | |
| `operator/=`  | 除算の複合代入 | `op_divide_assign` | |
| `operator/=`  | パス要素加算の複合代入 | `op_append_assign` | この演算�はファイルシステムの文脈で特殊な意味を持つ。<br/> 対応するメンバ関数`append()`と合わせた命名 |
| `operator%=`  | 剰余の複合代入 | `op_modulo_assign` | |
| `operator<<=` | 左ビットシフトの複合代入 | `op_left_shift_assign` | |
| `operator>>=` | 右ビットシフトの複合代入 | `op_right_shift_assign` | |
| `operator&=`  | ビット論理積の複合代入   | `op_and_assign` | |
| `operator`<code>&#x7C;</code>`=` | ビット論理和の複合代入 | `op_or_assign` | |
| `operator^=`  | ビット排他的論理和の複合代入 | `op_xor_assign` | |
| `operator++`  | インクリメント | `op_increment` | 前置・後置は同じページ内で解説する |
| `operator--`  | デクリメント | `op_decrement`   | 前置・後置は同じページ内で解説する |
| `operator+` (単項) | 単項プラス演算�              | `op_unary_plus` | |
| `operator-` (単項) | 単項マイナス演算� (符号反転) | `op_unary_minus` | |
| `operator!`   | 論理反転演算�   | `op_not`           | |
| `operator~`   | ビット反転演算� | `op_flip`          | |
| `operator==`  | �値比較演算�   | `op_equal`         | |
| `operator!=`  | 非�値比較演算� | `op_not_equal`     | |
| `operator<`   | 小なり演算�     | `op_less`          | |
| `operator>`   | 大なり演算�     | `op_greater`       | |
| `operator<=`  | 以下演算�       | `op_less_equal`    | |
| `operator>=`  | 以上演算�       | `op_greater_equal` | |
| `operator<=>` | 三方比較演算�   | `op_compare_3way`  | |
| `operator+` (二項) | 加算演算�  | `op_plus`          | |
| `operator-` (二項) | 減算演算�  | `op_minus`         | |
| `operator*` (二項) | 乗算演算�  | `op_multiply`      | |
| `operator/` (二項) | 除算演算�  | `op_divide`        | |
| `operator/` (二項) | パス要素加算の演算�  | `op_append` | この演算�はファイルシステムの文脈で特殊な意味を持つ |
| `operator/` (二項) | カレンダー構文の演算�  | `op_append` | 時間・日付ライブラリにおいて、この演算�はカレンダーの`YYYY/MM/DD`のような表記をできるようにする意味をもつ |
| `operator%` (二項) | 剰余演算�  | `op_modulo`        | |
| `operator&` | ビット論理積演算� | `op_and` | |
| `operator`<code>&#x7C;</code> | ビット論理和演算� | `op_or` | |
| `operator^` | ビット排他的論理和演算� | `op_xor` | |
| `operator&&` | 論理積演算� | `op_logical_and` | |
| `operator`<code>&#x7C;</code><code>&#x7C;</code> | 論理和演算� | `op_logical_or` | |
| `operator<<` | ビット左シフト演算� | `op_left_shift`  | |
| `operator>>` | ビット右シフト演算� | `op_right_shift` | |
| `operator<<` | 出力ストリーム演算� | `op_ostream`     | ビットシフトと意味論が異なるため、別ページとしている |
| `operator>>` | 入力ストリーム演算� | `op_istream`     | ビットシフトと意味論が異なるため、別ページとしている |


C++にはこの表に含まれない演算�もいくつかあるが、ここでは標準ライブラリでオーバー�ードされ、本サイトが掲載している演算�のみを記載している。

この表に含まれない演算�として、以下のようなものもある：

- 型変換演算�
    - `operator int`のような`int`への型変換演算�は、`op_int`のようなファイル名とする
    - 型の別名が使用される場合もあるが、`operator int_type`型変換演算�の場合は、`op_int_type`をファイル名とする
    - 規格で`operator unsigned`を使用しているところは、`operator unsigned int`とし、`op_unsigned_int`をファイル名とする。`unsigned`は`unsigned int`の�縮だが、この�縮法は認知度が低いため
- リテラル演算�
    - `operator ""i`のような`i`サフィックスのリテラル演算�は、`op_i`のようなファイル名とする


## 同名のメンバ関数と非メンバ関数がある場合
非メンバ関数側のページファイル名末尾に`_free`を付ける。

`free`は「非メンバ関数 (non member function)」の通称である「フリー関数 (free function)」からきている。これを採用した理由は以下：

- `_non_member_function`は長いため、�くしたい
- `member`は男性器を意味するため、`function`は省略できない
- 規格用語にはないが、ページファイル名を�くするために便宜上`free`を採用する


## その他、例外的なページファイル名
- [`std::_Exit()`](/reference/cstdlib/exit_.html)は、ページファイル名を先�アンダースコアしたところ、Chromeブラウザで404 Page Not Foundとなったため、回避�として末尾にアンダースコアを付けている

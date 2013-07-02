#type_traits(C++11)
`<type_traits>`ヘッダでは、型の特性を判定、操作するためのクラスを定義する。
このライブラリに含まれるクラステンプレートは、メタ関数(meta function)と呼ばれている。


##ヘルパークラス

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------------------------|-------------------------------|-------|
| [`integral_constant`](./type_traits/integral_constant-true_type-false_type.md) | 定数を表す型 (class template) | C++11 |
| [`true_type`](./type_traits/integral_constant-true_type-false_type.md)         | `true`を表す型 (typedef) | C++11 |
| [`false_type`](./type_traits/integral_constant-true_type-false_type.md)        | `false`を表す型 (typedef) | C++11 |


##基本的な型

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|---------------------------------------------------------|-------|
| [`is_void`](./type_traits/is_void.md)                         | 型が`void`型か調べる (class template) | C++11 |
| [`is_integral`](./type_traits/is_integral.md)                 | 型が整数型か調べる (class template) | C++11 |
| [`is_floating_point`](./type_traits/is_floating_point.md)     | 型が浮動小数点型か調べる (class template) | C++11 |
| [`is_array`](./type_traits/is_array.md)                       | 型が配列型か調べる (class template) | C++11 |
| [`is_pointer`](./type_traits/is_pointer.md)                   | 型がポインタ型か調べる (class template) | C++11 |
| [`is_lvalue_reference`](./type_traits/is_lvalue_reference.md) | 型が左辺値参照型か調べる (class template) | C++11 |
| [`is_rvalue_reference`](./type_traits/is_rvalue_reference.md) | 型が右辺値参照型か調べる (class template) | C++11 |
| [`is_member_object_pointer`](./type_traits/is_member_object_pointer.md)     | 型がデータメンバへのポインタ型か調べる (class template) | C++11 |
| [`is_member_function_pointer`](./type_traits/is_member_function_pointer.md) | 型がメンバ関数へのポインタ型か調べる (class template) | C++11 |
| [`is_enum`](./type_traits/is_enum.md)                         | 型が列挙型か調べる (class template) | C++11 |
| [`is_union`](./type_traits/is_union.md)                       | 型が共用型か調べる (class template) | C++11 |
| [`is_class`](./type_traits/is_class.md)                       | 型がクラス型か調べる (class template) | C++11 |
| [`is_function`](./type_traits/is_function.md)                 | 型が関数型か調べる (class template) | C++11 |


##組み合わせた型

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|-----------------------------------------------|-------|
| [`is_reference`](./type_traits/is_reference.md)           | 型が参照型か調べる (class template) | C++11 |
| [`is_arithmetic`](./type_traits/is_arithmetic.md)         | 型が算術型か調べる (class template) | C++11 |
| [`is_fundamental`](./type_traits/is_fundamental.md)       | 型が単純型か調べる (class template) | C++11 |
| [`is_object`](./type_traits/is_object.md)                 | 型がオブジェクト型か調べる (class template) | C++11 |
| [`is_scalar`](./type_traits/is_scalar.md)                 | 型がスカラ型か調べる (class template) | C++11 |
| [`is_compound`](./type_traits/is_compound.md)             | 型が複合型か調べる (class template) | C++11 |
| [`is_member_pointer`](./type_traits/is_member_pointer.md) | 型がメンバポインタ型か調べる (class template) | C++11 |


##型の特性

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------------|-------|
| [`is_const`](./type_traits/is_const.md)       | 型が`const`修飾型か調べる (class template) | C++11 |
| [`is_volatile`](./type_traits/is_volatile.md) | 型が`volatile`修飾型か調べる (class template) | C++11 |
| [`is_trivial`](./type_traits/is_trivial.md)   | 型がトリビアル型か調べる (class template) | C++11 |
| `is_trivially_copyable`                       | 型がトリビアルコピー可能か調べる (class template) | C++11 |
| `is_standard_layout`                          | 型がスタンダードレイアウト型か調べる (class template) | C++11 |
| [`is_pod`](./type_traits/is_pod.md)           | 型がPOD型か調べる (class template) | C++11 |
| `is_literal_type`                             | 型がリテラル型か調べる (class template) | C++11 |
| [`is_empty`](./type_traits/is_empty.md)       | 型が空のクラスか調べる (class template) | C++11 |
| [`is_polymorphic`](./type_traits/is_polymorphic.md) | 型が多相的クラスか調べる (class template) | C++11 |
| [`is_abstract`](./type_traits/is_abstract.md) | 型が抽象クラスか調べる (class template) | C++11 |
| [`is_signed`](./type_traits/is_signed.md)     | 型が符号付き算術型か調べる (class template) | C++11 |
| [`is_unsigned`](./type_traits/is_unsigned.md) | 型が符号無し算術型か調べる (class template) | C++11 |
| [`is_constructible`](./type_traits/is_constructible.md) | 型のコンストラクタ呼出しが適格か調べる (class template) | C++11 |
| [`is_default_constructible`](./type_traits/is_default_constructible.md) | 型がデフォルト構築可能か調べる (class template) | C++11 |
| [`is_copy_constructible`](./type_traits/is_copy_constructible.md) | 型がコピー構築可能か調べる (class template) | C++11 |
| [`is_move_constructible`](./type_traits/is_move_constructible.md) | 型がムーブ構築可能か調べる (class template) | C++11 |
| [`is_assignable`](./type_traits/is_assignable.md) | 型が代入可能か調べる (class template) | C++11 |
| [`is_copy_assignable`](./type_traits/is_copy_assignable.md) | 型がコピー代入可能か調べる (class template) | C++11 |
| [`is_move_assignable`](./type_traits/is_move_assignable.md) | 型がムーブ代入可能か調べる (class template) | C++11 |
| [`is_destructible`](./type_traits/is_destructible.md) | 型が破棄可能か調べる (class template) | C++11 |
| `is_trivially_constructible` | 型がトリビアルに構築可能か調べる (class template) | C++11 |
| `is_trivially_default_constructible` | 型がトリビアルにデフォルト構築可能かを調べる (class template) | C++11 |
| `is_trivially_copy_constructible` | 型がトリビアルにコピー構築可能か調べる (class template) | C++11 |
| `is_trivially_move_constructible` | 型がトリビアルにムーブ構築可能か調べる (class template) | C++11 |
| `is_trivially_assignable` | 型がトリビアルに代入可能か調べる (class template) | C++11 |
| `is_trivially_copy_assignable` | 型がトリビアルにコピー代入可能か調べる (class template) | C++11 |
| `is_trivially_move_assignable` | 型がトリビアルにムーブ代入可能か調べる (class template) | C++11 |
| `is_trivially_destructible` | 型がトリビアルに破棄可能か調べる (class template) | C++11 |
| [`is_nothrow_constructible`](./type_traits/is_nothrow_constructible.md) | 型のコンストラクタ呼出しが適格であり、かつそのコンストラクタが例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_default_constructible`](./type_traits/is_nothrow_default_constructible.md) | 型がデフォルト構築でき、かつそのデフォルトコンストラクタが例外を投げないか調べる (class template) | C++11 |
| [`is_nothrow_copy_constructible`](./type_traits/is_nothrow_copy_constructible.md) | 型がコピー構築でき、かつそのコピーコンストラクタが例外を投げないか調べる (class template) | C++11 |
| `is_nothrow_move_constructible` | 型がムーブ構築でき、かつそのムーブコンストラクタが例外を投げないか調べる (class template) | C++11 |
| `is_nothrow_assignable` | 型の代入演算子呼び出しが適格であり、かつその代入演算子が例外を投げないか調べる (class template) | C++11 |
| `is_nothrow_copy_assignable` | 型がコピー代入でき、かつそのコピー代入演算子が例外を投げないか調べる (class template) | C++11 |
| `is_nothrow_move_assignable` | 型がムーブ代入でき、かつそのムーブ代入演算子が例外を投げないか調べる (class template) | C++11 |
| `is_nothrow_destructible` | 型が破棄でき、かつそのデストラクタが例外を投げないか調べる (class template) | C++11 |
| `has_virtual_destructor` | 型が仮想デストラクタを持っているか調べる (class template) | C++11 |


##型の特性についての問い合わせ

| 名前 | 説明 | 対応バージョン |
|----------------|---------------------------------------------|-------|
| `alignment_of` | 型のアライメントを取得する (class template) | C++11 |
| `rank`         | 配列型の次元数を取得する (class template)   | C++11 |
| `extent`       | 配列型の`i`番目の次元の要素数を取得する (class template) | C++11 |


##型の関係

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|-------------------------------------------|-------|
| [`is_same`](./type_traits/is_same.md) | 二つの型が同じ型か調べる (class template) | C++11 |
| `is_base_of`     | ある型が別の型の基底クラスか調べる (class template) | C++11 |
| `is_convertible` | ある型から別の型へ変換可能か調べる (class template) | C++11 |


##const-volatile の変更

| 名前 | 説明 | 対応バージョン |
|----------------|--------------------------------------------|-------|
| `remove_const` | 型の`const`修飾を除去する (class template) | C++11 |
| `remove_volatile` | 型の`volatile`修飾を除去する (class template) | C++11 |
| `remove_cv` | 型の`const-volatile`修飾を除去する (class template) | C++11 |
| `add_const` | 型を`const`修飾する (class template) | C++11 |
| `add_volatile` | 型を`volatile`修飾する (class template) | C++11 |
| `add_cv` | 型を`const-volatile`修飾する (class template) | C++11 |


##参照の変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| `remove_reference`     | 型から参照を除去する(class template)      | C++11 |
| `add_lvalue_reference` | 型に左辺値参照を追加する (class template) | C++11 |
| `add_rvalue_reference` | 型に右辺値参照を追加する (class template) | C++11 |


##符号の変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| `make_signed` | 算術型を符号付きにする (class template) | C++11 |
| `make_unsigned` | 算術型を符号なしにする (class template) | C++11 |


##配列の変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| `remove_extent` | 配列型から次元を除去する (class template) | C++11 |
| `remove_all_extents` | 配列型から全ての次元を除去する (class template) | C++11 |


##ポインタの変更

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| `add_pointer` | 型にポインタを追加する (class template) | C++11 |
| `remove_pointer` | 型からポインタを除去する (class template) | C++11 |


##その他の変換

| 名前 | 説明 | 対応バージョン |
|------------------------|-------------------------------------------|-------|
| `aligned_storage` | アライメント調整された領域を作る (class template) | C++11 |
| `aligned_union` | アライメント調整された共用体領域を作る (class template) | C++11 |
| `decay` | 関数テンプレートと同じ規則で推論された型を取得する (class template) | C++11 |
| `enable_if` | コンパイル時条件式が真の場合のみ有効な型 (class template) | C++11 |
| `conditional` | コンパイル時条件式 (class template) | C++11 |
| `common_type` | 変換可能な共通の型を取得する (class template) | C++11 |
| `underlying_type` | `enum`の基底型を取得する (class template) | C++11 |
| `result_of` | 関数の戻り値の型を取得する (class template) | C++11 |


##バージョン
###言語
- C++11

##参照
- [Boost Type Traits Library](http://www.boost.org/doc/libs/release/libs/type_traits/doc/html/index.html)
- [型特性 - Boost逆引きリファレンス](https://sites.google.com/site/boostjp/tips/type_traits)


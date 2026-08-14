# typeinfo
* typeinfo[meta header]

`<typeinfo>`ヘッダは、`typeid`演算子および`dynamic_cast`演算子と共に使用する型を定義する。

## フリースタンディング
このヘッダは、フリースタンディング処理系でも使用できる。本ヘッダが提供する全ての機能がフリースタンディング処理系で使用可能である。

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|-------------------------------------------------|-------|
| [`type_info`](typeinfo/type_info.md)   | 型情報型(class) | |
| [`bad_cast`](typeinfo/bad_cast.md)     | `dynamic_cast`失敗時に投げられる例外(class) | |
| [`bad_typeid`](typeinfo/bad_typeid.md) | ヌルポインタへの`typeid`で投げられる例外(class) | |

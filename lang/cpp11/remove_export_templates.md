# テンプレートのエクスポート機能を削除
* cpp11[meta cpp]

<!-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++11では、テンプレート定義をエクスポートする機能を削除する。

テンプレートのエクスポート機能は、ヘッダファイルでテンプレートを宣言し、ソースファイルでテンプレートを定義することで、コンパイル時間の短縮を目指すものであった。

```cpp
// f.h
template <class T>
void f();
```

```cpp
// f.cpp
export template <class T>
void f()
{
  ...
}
```

EDGフロントエンドとそれを使用するコンパイラのComeauとICCが唯一このエクスポート機能を実装したが、EDGはエクスポート機能の実装は困難であるために実装することを推奨しないとし、他のコンパイラベンダがこの機能を実装することはなかった。

エクスポート機能が標準C++に採択されてから10年が経過し、他のコンパイラベンダがこの機能に関心を持つことはなかったため、この機能を削除するに至った。

`export`キーワードはC++11標準では使用しなくなったが、後にC++20の[モジュール](/lang/cpp20/modules.md)で再利用された。


## 参照
- [N3065 Removing Export](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3065.html)
- [CWG Issue 820. Deprecation of export](https://wg21.cmeerw.net/cwg/issue820)
- [Using export keyword with templates - StackOverflow](http://stackoverflow.com/questions/5416872/using-export-keyword-with-templates)
- [N1426 Why We Can't Afford Export](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1426.pdf)
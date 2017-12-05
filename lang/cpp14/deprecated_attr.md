# [[deprecated]]属性
* cpp14[meta cpp]

## 概要
`[[deprecated]]`は、対象となる機能が非推奨であることを示す属性である。

ユーザーに提供するAPIは、バージョンアップしていくにあたって、非互換のインタフェース変更が必要になることがある。そういったときに、以下のようなことをユーザーに示す必要がある：

「この古いAPIは互換性のために残しているが、将来のバージョンでは削除される可能性がある。削除される前に、新しいAPIを使用するようにユーザーコードを修正してほしい」

このようなアナウンスは、リリースノートやAPI個別のドキュメントに記載されることが多いが、この方法ではユーザーに気づかれにくい。古いAPIを使用したときに、コンパイラに警告を表示させ、ユーザーに確実に非推奨の情報を伝えたい場合に、この`[[deprecated]]`属性を使用する。

```cpp
[[deprecated("please use new_func() function")]]
void old_func() {}

void new_func() {}

int main()
{
  old_func(); // warning: 'void old_func()' is deprecated: please use new_func() function
}
```

`[[deprecated]]`は、引数として文字列リテラルを指定すると、コンパイラの実装によっては、それがコンパイル時の警告メッセージとして使用される。引数を指定しない場合には、非推奨であることが警告として知らされるだけである。

機能を非推奨とするときには、必ず代わりに使用すべきAPIが存在する。可能な限り文字列リテラルを指定して、代わりに何を使用すればよいかをユーザーに示すのがよいだろう。


## 仕様
- `[[deprecated]]`属性の引数は、なにも指定しないか、もしくは文字列リテラルを指定するかのどちらかである
    - 引数なしの場合は、`[[deprecated]]`と記述する
	- 文字列リテラルを指定する場合は、`[[deprecated("message")]]`のように記述する
- 引数の文字列リテラルの扱いはコンパイラの実装定義だが、多くの場合、指定した文字列を、コンパイル時の警告として出力するだろう
    - 文字列リテラルの文字コードもまた、コンパイラの実装定義である
- この属性は、以下の宣言に対して適用できることがコンパイラに推奨される：
    - クラス
    - 型の別名
    - 変数
    - 非静的メンバ変数
    - 関数
    - 列挙型
    - テンプレートの特殊化


## 例
```cpp example
// 非推奨なクラス
class [[deprecated("please use new_class class")]] old_class {};

// 非推奨な型の別名
using old_type [[deprecated("please use new_type type")]] = int;

// 非推奨な変数
[[deprecated("please use new_variable variable")]]
int old_variable;

struct X {
  // 非推奨な非静的メンバ変数
  [[deprecated("please use new_member_variable")]]
  int old_member_variable;
};

// 非推奨な関数
[[deprecated("please use new_func() function")]]
void old_func() {}

// 非推奨な列挙型
enum class [[deprecated("please use new_enum")]] old_enum {};

template <class T>
class class_templ;

// 非推奨なテンプレートの特殊化
template <>
class [[deprecated("don't use class_templ<int> specialization")]] class_templ<int> {};

int main()
{
  old_class c;
  old_type t;

  old_variable = 1;

  X x;
  x.old_member_variable = 1;

  old_func();

  old_enum e;

  class_templ<int> ct;
}
```

### 出力
```
```

### 警告例
```
prog.cc:33:3: warning: 'old_class' is deprecated: please use new_class class
prog.cc:34:3: warning: 'old_type' is deprecated: please use new_type type
prog.cc:36:3: warning: 'old_variable' is deprecated: please use new_variable variable
prog.cc:39:5: warning: 'old_member_variable' is deprecated: please use new_member_variable
prog.cc:41:3: warning: 'old_func' is deprecated: please use new_func() function
prog.cc:43:3: warning: 'old_enum' is deprecated: please use new_enum
prog.cc:45:3: warning: 'class_templ<int>' is deprecated: don't use class_templ<int> specialization
```


## この機能が必要になった背景・経緯
機能が非推奨であることを示す属性は、C++11で属性構文が導入されるより前から、各コンパイラが独自の構文でサポートしていた。

| コンパイラ  | 簡潔な非推奨化 | メッセージ付きの非推奨化 |
|-------------|----------------|--------------------------|
| GCCとClang  | `__attribute__((deprecated)) int a;` | `__attribute__((deprecated("message"))) int a;` |
| Visual C++  | `__declspec(deprecated) int a;`      | `__declspec(deprecated("message")) int a;` |
| C++ Builder | `int a [[deprecated]];`              | `int a [[deprecated("message")]];` |

これらの機能が使われてきた経験から、この属性・アノテーションは、ユーザーにとって役立つものであることが判明していた。そのため、この機能をC++標準の属性構文でサポートすることとなった。


## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)


## 参照
- [N3394 `[[deprecated]]` attribute](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3394.html)
- [N3760 `[[deprecated]]` attribute](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3760.html)


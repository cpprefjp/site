# コンストラクタ
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function[meta id-type]

```cpp
locale() noexcept;                                                 // (1) C++03
locale(const locale& other) noexcept;                              // (2) C++03
explicit locale(const char* std_name);                             // (3) C++03
explicit locale(const string& std_name);                           // (4) C++03
locale(const locale& other,
       const char* std_name, category cats);                       // (5) C++03
locale(const locale& other,
       const string& std_name, category cats);                     // (6) C++03
template <class Facet>
locale(const locale& other, Facet* f);                             // (7) C++03
locale(const locale& other, const locale& one, category cats);     // (8) C++03
```
* string[link /reference/string/basic_string.md]

## 概要
`locale`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。呼び出した時点でのグローバル`locale`のコピーを構築する。
- (2) : コピーコンストラクタ。
- (3) : ロケール名`std_name`で識別されるロケールを構築する。
- (4) : ロケール名`std_name`で識別されるロケールを構築する。
- (5) : `cats`で指定されたカテゴリのファセットをロケール名`std_name`のロケールから、それ以外のファセットを`other`から取得したロケールを構築する。
- (6) : (5)と同じく、`cats`で指定されたカテゴリのファセットをロケール名`std_name`のロケールから、それ以外のファセットを`other`から取得したロケールを構築する。
- (7) : `other`のすべてのファセットに加えて、ファセット`f`を組み込んだロケールを構築する。
- (8) : `cats`で指定されたカテゴリのファセットを`one`から、それ以外のファセットを`other`から取得したロケールを構築する。


## 事前条件
- (5), (6), (8) : `cats`は、有効なカテゴリ値（[`category`](category.md.nolink)を構成する各ビットの論理和、もしくは[`none`](category.md.nolink)）であること。


## 効果
- (1) : グローバル`locale`（[`global`](global.md.nolink)関数で設定される`locale`）のコピーを構築する。
- (2) : `other`のコピーを構築する。
- (3) : ロケール名`std_name`で識別されるロケールを構築する。
- (4) : `locale(std_name.c_str())`と等価。
- (5) : `other`のコピーを構築するが、`cats`で指定されたカテゴリに対応するファセットについては、`locale(std_name)`が保持するファセットで置き換える。
- (6) : `locale(other, std_name.c_str(), cats)`と等価。
- (7) : `other`のコピーを構築する。`f`がヌルポインタでなければ、ファセット`f`を組み込む。
- (8) : `other`のコピーを構築するが、`cats`で指定されたカテゴリに対応するファセットについては、`one`が保持するファセットで置き換える。


## 例外
- (3) : `std_name`が有効なロケール名でない場合、もしくはヌルポインタである場合、[`std::runtime_error`](/reference/stdexcept.md)を送出する。
- (4) : (3)と同じ。
- (5) : `std_name`が有効なロケール名でない場合、もしくはヌルポインタである場合、[`std::runtime_error`](/reference/stdexcept.md)を送出する。
- (6) : (5)と同じ。


## 備考
構築される`locale`が名前を持つ（[`name`](name.md.nolink)関数が`"*"`以外を返す）かどうかは、以下のように定まる。

- (1), (2) : コピー元が名前を持つ場合に限り、名前を持つ。
- (3), (4) : 常に名前を持つ。
- (5), (6) : `other`が名前を持つ場合に限り、名前を持つ。
- (7) : `f`がヌルポインタの場合、`other`と同じ名前を持つ。`f`がヌルポインタでない場合、名前を持たない。
- (8) : `cats == locale::none`の場合、`other`が名前を持つときに限り名前を持つ。そうでない場合、`other`と`one`の両方が名前を持つときに限り名前を持つ。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // (3) ロケール名から構築（"C"ロケール）
  std::locale loc("C");
  std::cout << loc.name() << std::endl;

  // (7) 既存ロケールにヌルポインタを渡すと、otherと同じ名前を持つ
  std::locale loc_null(loc, static_cast<std::ctype<char>*>(nullptr));
  std::cout << loc_null.name() << std::endl;

  // (7) 非ヌルのファセットを渡すと、名前を持たない
  std::locale loc_facet(loc, new std::ctype<char>);
  std::cout << loc_facet.name() << std::endl;
}
```
* name()[link name.md.nolink]
* std::ctype[link ../ctype.md]

### 出力
```
C
C
*
```


## バージョン
### 言語
- C++98


## 関連項目
- [`locale::operator=`](op_assign.md.nolink)
- [`locale::global`](global.md.nolink)
- [`locale::name`](name.md.nolink)


## 参照
- [LWG Issue 2295. Locale name when the provided `Facet` is a `nullptr`](https://cplusplus.github.io/LWG/issue2295)
    - C++23で、(7)のコンストラクタで`f`がヌルポインタの場合、構築される`locale`は`other`と同じ名前を持つことが明確化された。あわせて、カテゴリを受け取るコンストラクタの引数名が`cat`から`cats`に変更され、`cats`が有効なカテゴリ値であることが事前条件として追加された

# コンストラクタ
* locale[meta header]
* std[meta namespace]
* messages_byname[meta class]
* function[meta id-type]

```cpp
explicit messages_byname(const char* name, size_t refs = 0);   // (1) C++98
explicit messages_byname(const string& name, size_t refs = 0); // (2) C++98
```
* size_t[link /reference/cstddef/size_t.md]
* string[link /reference/string/basic_string.md]

## 概要
名前で指定したロケールの、翻訳メッセージの取得ファセットオブジェクトを構築する。

- (1) : ロケール名を`const char*`で受け取る
- (2) : ロケール名を[`string`](/reference/string/basic_string.md)で受け取る


## 効果
- (1) : `name`を名前として[`locale(const char*)`](/reference/locale/locale/op_constructor.md)で構築されるロケールの、[`messages`](/reference/locale/messages.md)ファセットと等価な仮想関数の意味論を持つよう構築する。`refs`は基底クラスのコンストラクタへ渡される
- (2) : `messages_byname(name.c_str(), refs)`と同じ効果を持つ


## 例外
`name`が妥当なロケール名でない場合、もしくはヌルポインタである場合、[`std::runtime_error`](/reference/stdexcept.md)を送出する。


## 備考
`refs`は、このファセットの参照カウントの初期値である。

- `refs == 0`の場合、このファセットを保持する[`locale`](/reference/locale/locale.md)オブジェクトが破棄されるとき、ファセットも破棄される
- `refs == 1`の場合、[`locale`](/reference/locale/locale.md)オブジェクトの破棄によってファセットが破棄されることはない

妥当なロケール名は処理系定義である。`"C"`と、処理系のネイティブロケールを表す空文字列`""`は、すべての処理系でサポートされる。

## 例
メッセージカタログの形式と探索方法は処理系定義である。以下は、POSIXの`catgets`形式のカタログを使用する処理系での例である。

日本語のメッセージのソースファイル`ja.msg`を、

```
$set 1
1 こんにちは、世界！
```

POSIXの`gencat`コマンドでカタログファイル`ja.cat`へ変換したものが存在するとする。

```
gencat ja.cat ja.msg
```

```cpp
#include <iostream>
#include <locale>
#include <string>

int main()
{
  std::string name = "ja_JP.UTF-8";

  // (1) ロケール名をconst char*で渡す
  std::locale loc1{std::locale::classic(), new std::messages_byname<char>{"ja_JP.UTF-8"}};

  // (2) ロケール名をstringで渡す
  std::locale loc2{std::locale::classic(), new std::messages_byname<char>{name}};

  for (const std::locale& loc : {loc1, loc2}) {
    const auto& msgs = std::use_facet<std::messages<char>>(loc);

    std::messages_base::catalog cat = msgs.open("./ja.cat", loc);

    if (cat >= 0) {
      std::cout << msgs.get(cat, 1, 1, "Hello, world!") << std::endl;
      msgs.close(cat);
    }
  }
}
```
* std::messages_byname[color ff0000]
* std::messages[link /reference/locale/messages.md]
* std::messages_base::catalog[link /reference/locale/messages_base.md]
* msgs.open[link /reference/locale/messages/open.md]
* msgs.get[link /reference/locale/messages/get.md]
* msgs.close[link /reference/locale/messages/close.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力例
```
こんにちは、世界！
こんにちは、世界！
```

- `messages_byname`を使うと、グローバルロケールを変更することなく、メッセージのカテゴリだけを特定の名前のロケールのものに固定できる
- カタログ名からカタログへの対応付けは処理系定義である。GNU gettextを使用する処理系では、`open()`にドメイン名を渡すことで、ロケール名に対応するカタログが選択される
- 妥当なロケール名は処理系定義である。指定した名前が妥当でない場合、コンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出する


## バージョン
### 言語
- C++98


## 関連項目
- [`messages`](/reference/locale/messages.md)
- [`locale`のコンストラクタ](/reference/locale/locale/op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)

# messages_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class messages_byname : public messages<charT>;
}
```
* messages[link /reference/locale/messages.md]

## 概要
`messages_byname`は、名前で指定したロケールの翻訳メッセージの取得を提供する、[`messages`](/reference/locale/messages.md)の派生クラスである。

[`messages`](/reference/locale/messages.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`messages`](/reference/locale/messages.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](messages_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](messages_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `catalog` | 翻訳カタログ型 [`messages_base`](/reference/locale/messages_base.md)`::catalog` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

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

int main()
{
  // メッセージのカテゴリだけを"ja_JP.UTF-8"ロケールのものにし、
  // 数値の書式などその他のカテゴリはCロケールのままにする
  std::locale loc{std::locale::classic(), new std::messages_byname<char>{"ja_JP.UTF-8"}};

  const auto& msgs = std::use_facet<std::messages<char>>(loc);

  std::messages_base::catalog cat = msgs.open("./ja.cat", loc);

  if (cat >= 0) {
    // 日本語のメッセージが取得できる
    std::cout << msgs.get(cat, 1, 1, "Hello, world!") << std::endl;
    msgs.close(cat);
  }

  // 数値の小数点はCロケールのまま
  std::cout << std::use_facet<std::numpunct<char>>(loc).decimal_point() << std::endl;
}
```
* std::messages_byname[color ff0000]
* std::messages[link messages.md]
* std::messages_base::catalog[link messages_base.md]
* msgs.open[link messages/open.md]
* msgs.get[link messages/get.md]
* msgs.close[link messages/close.md]
* std::numpunct[link numpunct.md]
* decimal_point()[link numpunct/decimal_point.md]
* std::use_facet[link use_facet.md]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]

### 出力例
```
こんにちは、世界！
.
```

- `messages_byname`を使うと、グローバルロケールを変更することなく、メッセージのカテゴリだけを特定の名前のロケールのものに固定できる
- カタログ名からカタログへの対応付けは処理系定義である。GNU gettextを使用する処理系では、`open()`にドメイン名を渡すことで、ロケール名に対応するカタログが選択される
- 妥当なロケール名は処理系定義である。指定した名前が妥当でない場合、コンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出する


## バージョン
### 言語
- C++98


## 関連項目
- [`messages`](/reference/locale/messages.md)
- [`locale`](locale.md)

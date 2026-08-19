# locale
* locale[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class locale;
}
```

## 概要
`locale`は、地域化のデータを表現するクラスである。`locale`はファセットの集合を保持しており、`has_facet()`と`use_facet()`の関数テンプレートで`locale`が保持しているファセットを調査・取得できる。ファセットは[`facet`](locale/facet.md)の派生クラスである。

### メンバ関数

| 名前 | 説明 |
|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| [`(constructor)`](locale/op_constructor.md) | コンストラクタ |
| `(destructor)` | デストラクタ |
| [`operator=`](locale/op_assign.md) | 代入演算子 |
| [`combine`](locale/combine.md) | 合成 |
| [`name`](locale/name.md) | 名前の取得 |
| [`encoding`](locale/encoding.md) | エンコーディングの取得 (C++26) |
| [`operator==`](locale/op_equal.md) | 等値比較 |
| [`operator!=`](locale/op_not_equal.md) | 非等値比較 |
| [`operator()`](locale/op_call.md) | 照合オブジェクトを使用した文字列比較 |

### 静的メンバ関数

| 名前 | 説明 |
|----------------------|---------------------------------------------------|
| [`global`](locale/global.md) | グローバルロケールの設定 |
| [`classic`](locale/classic.md) | Cロケールを表すオブジェクトの取得 |

### メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `category` | ビットマスク型 `int`。 `locale`が保持するファセットを識別する用途。 |
| [`id`](locale/id.md) | `facet`の識別用のクラス |
| [`facet`](locale/facet.md) | ファセットの基底クラス |

### メンバ定数

| 名前 | 説明 |
|------|------|
| `static const category none = 0;` | ファセットなし |
| `static const category collate = 0x10;` | 照合ファセット |
| `static const category ctype = 0x20;` | 文字分類ファセット |
| `static const category monetary = 0x40;` | 金額ファセット |
| `static const category numeric = 0x80;` | 数値ファセット |
| `static const category time = 0x100;` | 日時ファセット |
| `static const category messages = 0x200;` | メッセージファセット |
| `static const category all =   collate`<br/> <code>                            &#x7C; </code>`ctype`<br/> <code>                            &#x7C; monetary</code><br/> <code>                            &#x7C; numeric</code><br/> <code>                            &#x7C; time</code><br/> <code>                            &#x7C; messages;</code> | 全てのファセット |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // 現在の環境のロケールを取得する
  std::locale loc("");

  // ロケールに基いて文字を大文字化する
  std::cout << std::toupper('a', loc) << std::endl;

  // ロケールに基いて数値を出力する
  std::cout.imbue(loc);
  std::cout << 1234567 << std::endl;
}
```
* std::locale[color ff0000]
* std::toupper[link toupper.md]
* imbue[link /reference/ios/ios_base/imbue.md]

#### 出力例
```
A
1,234,567
```

### Cロケールを使う
処理系標準のロケール（Cロケール）は、[`classic()`](locale/classic.md)で取得できる。このロケールでは、数値の桁区切りなどの地域化は行われない。

```cpp example
#include <iostream>
#include <locale>

int main()
{
  // "C"ロケールを取得する
  std::locale loc = std::locale::classic();
  std::cout.imbue(loc);

  // 桁区切りは行われない
  std::cout << 1234567 << std::endl;
}
```
* std::locale[color ff0000]
* classic()[link locale/classic.md]
* imbue[link /reference/ios/ios_base/imbue.md]

#### 出力
```
1234567
```

### ロケール名を指定する
ロケール名を文字列で指定して、特定の地域のロケールを構築できる。以下は日本語ロケールを指定する例である。

```cpp example
#include <iostream>
#include <locale>

int main()
{
  // 日本語ロケールを名前で指定する
  std::locale loc("ja_JP.UTF-8");
  std::cout.imbue(loc);

  // ロケールに基いて数値が桁区切りされる
  std::cout << 1234567 << std::endl;
}
```
* std::locale[color ff0000]
* imbue[link /reference/ios/ios_base/imbue.md]

指定できるロケール名は処理系や環境に依存する。

#### 出力例
```
1,234,567
```

### 日時を出力する
ストリームにロケールを設定すると、[`std::put_time`](/reference/iomanip/put_time.md)による日時の出力もそのロケールに従う。

```cpp example
#include <ctime>
#include <iomanip>
#include <iostream>
#include <locale>

int main()
{
  // 日本語ロケールを設定する
  std::locale loc("ja_JP.UTF-8");
  std::cout.imbue(loc);

  // 2025年8月19日 (火) 12:34:56
  std::tm tm{};
  tm.tm_year = 2025 - 1900;
  tm.tm_mon = 8 - 1;
  tm.tm_mday = 19;
  tm.tm_hour = 12;
  tm.tm_min = 34;
  tm.tm_sec = 56;
  tm.tm_wday = 2;

  // ロケールに基いて日時を出力する（%a はロケールに応じた曜日名）
  std::cout << std::put_time(&tm, "%Y年%m月%d日 (%a) %H時%M分%S秒") << std::endl;
}
```
* std::locale[color ff0000]
* imbue[link /reference/ios/ios_base/imbue.md]
* std::tm[link /reference/ctime/tm.md.nolink]
* std::put_time[link /reference/iomanip/put_time.md]

#### 出力例
```
2025年08月19日 (火) 12時34分56秒
```


## バージョン
### 言語
- C++03


## 関連項目
- [`use_facet`](use_facet.md)
- [`has_facet`](has_facet.md)
- [`locale::facet`](locale/facet.md)


## 参照

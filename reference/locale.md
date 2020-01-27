# locale
* locale[meta header]

`<locale>`ヘッダでは、�ーカライゼーション（地域化）に関するクラス・関数を定義する。このヘッダに含まれるクラス・関数は`std`名前空間で定義される。


## �ケール

| 名前 | 説明 | 対応バージョン |
|--------------------------------|-----------------------------|-------|
| [`locale`](locale/locale.md) | �ケール(class) | |
| `use_facet` | �ケールが持つファセットの取得(function) | |
| `has_facet` | �ケールがファセットを持っているか判定(function) | |


## 利便性インタフェース

| 名前 | 説明 | 対応バージョン |
|--------------------------------|-----------------------------|-------|
| `isspace` | 空白類文�の判定(function) | |
| `isprint` | 印�可能文�の判定(function) | |
| `iscntrl` | 制御文�の判定(function) | |
| `isupper` | 英大文�の判定(function) | |
| `islower` | 英小文�の判定(function) | |
| `isalpha` | 英�の判定(function) | |
| `isdigit` | 数�の判定(function) | |
| `ispunct` | 区切り文�の判定(function) | |
| `isxdigit` | 十�進数�の判定(function) | |
| `isalnum` | 英�・数�の判定(function) | |
| `isgraph` | 図形文�の判定(function) | |
| [`toupper`](locale/toupper.md) | 英大文�への変換(function) | |
| [`tolower`](locale/tolower.md) | 英�文�への変換(function) | |
| [`wstring_convert`](locale/wstring_convert.md) | `codecvt`による文�列変換(class template) | C++11<br/> C++17から非推奨 |
| [`wbuffer_convert`](locale/wbuffer_convert.md) | `codecvt`によるストリームバッファ変換(class template) | C++11<br/> C++17から非推奨 |
| [`ctype_base`](locale/ctype_base.md) | 文�分類のための基底クラス(class) | |
| [`ctype`](locale/ctype.md) | 文�の分類(class template) | |
| [`ctype_byname`](locale/ctype_byname.md) | 名前による文�の分類(class template) | |
| [`codecvt_base`](locale/codecvt_base.md) | 文�コード変換のための基底クラス(class) | |
| [`codecvt`](locale/codecvt.md) | 文�コード変換(class template) | |
| [`codevt_byname`](locale/codecvt_byname.md) | 名前による文�コード変換(class template) | |


## 数値

| 名前 | 説明 | 対応バージョン |
|------------------------------------|----------------------------|-------|
| [`num_get`](locale/num_get.md)   | 数値の解析(class template) | |
| [`num_put`](locale/num_put.md)   | 数値の出力(class template) | |
| [`numpunct`](locale/numpunct.md) | 数値の区切り文�に関する情報(class template) | |
| [`numpunct_byname`](locale/numpunct_byname.md) | 名前による数値の区切り文�情報(class template) | |


## 照合

| 名前 | 説明 | 対応バージョン |
|------------------------------------|----------------------------|-------|
| [`collate`](locale/collate.md) | 文�列の照合(class template) | |
| [`collate_byname`](locale/collate_byname.md) | 名前による文�列の照合(class template) | |


## 日付と時間

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`time_base`](locale/time_base.md)             | 日時解析のための基底クラス(class) | |
| [`time_get`](locale/time_get.md)               | 日時の解析(class template) | |
| [`time_get_byname`](locale/time_get_byname.md) | 名前による日時解析(class template) | |
| [`time_put`](locale/time_put.md)               | 日時の出力(class template) | |
| [`time_put_byname`](locale/time_put_byname.md) | 名前による日時出力(class template) | |


## 金額

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`money_get`](locale/money_get.md) | 金額の解析(class template) | |
| [`money_put`](locale/money_put.md) | 金額の出力(class template) | |
| [`money_base`](locale/money_base.md) | 金額解析のための基底クラス(class) | |
| [`moneypunct`](locale/moneypunct.md) | 金額のフォーマット(class template) | |
| [`moneypunct_byname`](locale/moneypunct_byname.md) | 名前による金額のフォーマット(class template) | |


## メッセージ取得

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`messages_base`](locale/messages_base.md) | メッセージ取得のための基底クラス(class) | |
| [`messages`](locale/messages.md) | メッセージカタ�グから対応する翻訳メッセージの取得(class template) | |
| [`messages_byname`](locale/messages_byname.md) | 名前による翻訳メッセージの取得(class template) | |




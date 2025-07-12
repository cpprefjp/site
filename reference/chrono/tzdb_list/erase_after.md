# erase_after
* chrono[meta header]
* std::chrono[meta namespace]
* tzdb_list[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
const_iterator erase_after(const_iterator p);
```

## 概要
指定したイテレータの次の要素を削除する。


## 事前条件
- イテレータ`p`の次の要素が間接参照可能であること


## 効果
イテレータ`p`の次の要素を削除する


## 戻り値
削除された要素の次の要素を返す


## 例外
投げない。

先頭要素を削除する方法がないため ([`std::forward_list`](/reference/forward_list/forward_list.md)とちがって`before_begin()`メンバ関数がない)、この関数は例外を投げない。


## 備考
- 削除された要素以外の要素を指すポインタ、参照、イテレータは無効にならない
- この関数は、[`reload_tzdb()`](/reference/chrono/reload_tzdb.md)関数内で呼び出されるが、ユーザーが呼び出す方法はない


## バージョン
### 言語
- C++20

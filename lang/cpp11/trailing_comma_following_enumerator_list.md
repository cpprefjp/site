# 列挙�の末尾へのカンマ付加を許可
* cpp11[meta cpp]

## 概要
C99互換として、末尾の列挙�の後ろにカンマを書くことが許可された。


## 仕様
enum列挙型の構文が、以下のようになった：

```
enum identifier opt { enumerator-list opt }
enum identifier opt { enumerator-list , } // 追加
```
* opt[italic]

従来からある1行目の�み方は、以下のようになる：

「`enum`�ーワードの後ろに省略可能な列挙型の�別�を付ける。その後の波カッコ内には、列挙�をカンマ区切りで記述する。その列挙�のリストは省略可能である。」

追加された2行目の�み方は、以下のようになる：

「`enum`�ーワードの後ろに省略可能な列挙型の�別�を付ける。その後の波カッコ内には、列挙�をカンマ区切りでひとつ以上記述する。その列挙�のリストに続いて、カンマをひとつ入力できる。」


## 例
```cpp
enum Color {
  Red,
  Green,
  Blue, // このカンマが書けるようになった
};

int main() {}
```

### 出力
```
```


## 参照
- [CWG Issue 518. Trailing comma following enumerator-list](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#518)


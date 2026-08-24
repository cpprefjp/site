# imbue
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual void imbue(const locale& loc);  // (1) C++03
  void imbue(const locale& loc) override; // (1) C++17
```
* locale[link /reference/locale/locale.md]

## 概要
ロケールを設定する。

このメンバ関数は`protected`であり、[`std::basic_streambuf`](/reference/streambuf/basic_streambuf.md)の`public`メンバ関数[`pubimbue()`](/reference/streambuf/basic_streambuf/pubimbue.md)を通して間接的に呼び出される。


## 事前条件
ファイルが先頭以外の位置にあり、かつ現在のロケールの[`codecvt`](/reference/locale/codecvt.md)ファセットの`encoding()`が状態依存のエンコーディングを示す場合、そのファセットが`loc`の対応するファセットと同じであること。


## 効果
この呼び出し以降に挿入・抽出される文字が、次に`imbue`が呼び出されるまで`loc`に従って変換されるようにする。


## 戻り値
なし


## 備考
この関数は、それまでに変換した文字の再変換を必要とする場合がある。またそのために、処理系がファイルの元の内容を復元できることを必要とする場合がある。


## 例
```cpp example
#include <iostream>
#include <fstream>
#include <locale>

// basic_filebufを継承して、protectedなimbueの呼び出しを観測する
struct my_filebuf : std::filebuf {
protected:
  void imbue(const std::locale& loc) override
  {
    std::cout << "imbue" << std::endl;
    std::filebuf::imbue(loc);
  }
};

int main()
{
  my_filebuf buf;
  buf.open("test.txt", std::ios_base::out);

  // pubimbue()を通してimbue()が呼ばれる
  buf.pubimbue(std::locale::classic());
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* imbue[color ff0000]
* buf.open[link open.md]
* buf.pubimbue[link /reference/streambuf/basic_streambuf/pubimbue.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
imbue
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf::imbue`](/reference/streambuf/basic_streambuf/imbue.md)
- [`basic_streambuf::pubimbue`](/reference/streambuf/basic_streambuf/pubimbue.md)
- [`codecvt`](/reference/locale/codecvt.md)

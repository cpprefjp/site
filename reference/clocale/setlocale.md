# setlocale
* clocale[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
	char* setlocale(int category, const char* locale);
}
```

## 概要
指定したカテゴリのロケールを設定、または現在のロケールを取得する。

指定できるロケール文字列は[以下のページ](/article/platform/locales.md)である。

## 引数
- `category`：設定対象のカテゴリ。`LC_ALL`,`LC_CTYPE`などのマクロを使用。
- `locale`：
	* "C"：標準のCロケール
	* ""：環境依存のデフォルトロケール
	* `NULL`：現在のロケールを取得するだけ

## 戻り値
成功時は設定されたロケール名（文字列）、失敗時は`NULL`。

## 例
```cpp example
#include <iostream>
#include <clocale>

int main(){
  // 日本語ロケールに設定
  if (!std::setlocale(LC_ALL, "ja_JP.UTF-8")) {
    std::cerr << "Failed to set locale\n";
    return 1;
  }

  // 現在の全カテゴリのロケールを取得
  std::cout << "Current locale: " << std::setlocale(LC_ALL, NULL) << "\n";

  // 数値カテゴリだけ確認
  std::cout << "Numeric locale: " << std::setlocale(LC_NUMERIC, NULL) << "\n";
}

```

### 出力
```
Current locale: ja_JP.UTF-8
Numeric locale: ja_JP.UTF-8
```

## 関連項目
- [ ロケール文字一覧 ](/article/platform/locales.md)
- [ `std::locale` ](/reference/locale/locale.md)

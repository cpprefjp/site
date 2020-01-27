# exception
* exception[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class exception;
}
```

## 概要
`exception`クラスは、標準ライブラリが提供する全ての例外クラスの基底クラスである。

標準ライブラリによって送出される例外オブジェクトのクラスは全て、このクラスから派生する。したがって、標準の例外は全てこのクラスで捕捉できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|---------------------------------------------|-------|
| `exception() noexcept;`<br/>`exception(const exception&) noexcept;` | コンストラクタ | |
| `virtual ~exception();` | デストラクタ | |
| `exception& operator=(const exception&) noexcept;` | 代入演算� | |
| `virtual const char* what() const noexcept;` | 実装定義のエラー内容を取得する | |


## 例
```cpp example
#include <iostream>
#include <exception>
#include <stdexcept> // std::runtime_error

int main()
{
  try {
    bool is_error = true;
    if (is_error) { // なんらかのエラーが発生した
      throw std::runtime_error("error!"); // 例外送出
    }
  }
  catch (std::exception& e) {
    // 例外を捕捉
    // エラー理由を出力する
    std::cout << e.what() << std::endl;
  }
}
```

### 出力
```
error!
```


## 参照


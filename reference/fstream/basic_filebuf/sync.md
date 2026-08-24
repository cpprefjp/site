# sync
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int sync();  // (1) C++03
  int sync() override; // (1) C++17
```

## 概要
制御対象のシーケンスとファイルを同期する（出力をフラッシュする）。

このメンバ関数は`protected`であり、[`std::basic_streambuf`](/reference/streambuf/basic_streambuf.md)の`public`メンバ関数[`pubsync()`](/reference/streambuf/basic_streambuf/pubsync.md)を通して間接的に呼び出される。


## 効果
put領域が存在する場合、`basic_filebuf`の[`overflow`](overflow.md)を呼び出して文字をファイルに書き込み、その後あたかも[`std::fflush`](/reference/cstdio/fflush.md)`(file)`を呼び出したかのようにファイルをフラッシュする。

get領域が存在する場合の効果は、処理系定義である。


## 戻り値
失敗した場合は`-1`を返す。それ以外の場合は`0`を返す。何を失敗とみなすかは、このクラスが定める。


## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf::sync`](/reference/streambuf/basic_streambuf/sync.md)
- [`basic_streambuf::pubsync`](/reference/streambuf/basic_streambuf/pubsync.md)


## 参照
- [LWG Issue 2473. `basic_filebuf`'s relation to C `FILE` semantics](https://cplusplus.github.io/LWG/issue2473)
    - `sync`があたかも`fflush(file)`を呼び出したかのようにファイルをフラッシュする、と明確化された（CのFILEにおける入出力操作の相互作用に整合させるため）
    - この修正は欠陥報告(DR)であり、C++98に遡及して適用される。`seekoff`には`fseek`の言及があるのに`sync`にはCの対応関数の言及が欠けていた規定漏れの補完であり、処理系は当初からCの`FILE`のセマンティクスに従って実装されていたため

# デストラクタ
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
virtual ~basic_filebuf(); // (1) C++98
```

## 概要
オブジェクトを破棄する。

## 効果
[`close()`](close.md)を呼び出す。
そこで例外が発生した場合、catchして何も行わない（再送出しない）。

## 実装例
```cpp
virtual ~basic_filebuf() {
  try {
    close();
  } catch (...) {
  }
}
```

### 注意
このデストラクタ内で呼び出した`close`メンバ関数で何か問題が発生した場合、それを検出する方法はない。
`close`メンバ関数が成功したことの判定は、特に書き込み目的でファイルを開いている場合、重要である。
なぜなら、`close`内部で`basic_filebuf`や`FILE*`などが保持するバッファからの書き出しがあるため、ここで書き込み処理に失敗する可能性があるためである。
失敗時の処理をきちんと行うためには、デストラクタに頼らず予め`close`メンバ関数を呼び出しておくべきである。

## バージョン
### 言語
- C++98

